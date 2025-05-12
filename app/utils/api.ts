const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://unihealth-production.up.railway.app';

// First check if the server is accessible
async function checkServerHealth() {
  try {
    console.log('Checking server health at:', API_URL);
    
    // Try a simple fetch without CORS mode first
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Health check response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Server health check failed:', {
      error,
      url: API_URL,
      message: error instanceof Error ? error.message : 'Unknown error'
    });

    // Try to check if the URL is accessible at all
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const testResponse = await fetch(API_URL, { 
        signal: controller.signal,
        mode: 'no-cors' // This will tell us if the server exists at all
      });
      
      clearTimeout(timeoutId);
      console.log('Server exists but might have CORS issues');
    } catch (testError) {
      console.error('Server might be down or unreachable');
    }

    return false;
  }
}

export async function chatWithAI(message: string) {
  try {
    console.log('API URL being used:', API_URL);
    
    // Check server health first
    const isHealthy = await checkServerHealth();
    if (!isHealthy) {
      throw new Error('Cannot connect to AI server. Please check if the server is running on Railway.');
    }

    console.log('Attempting to call AI API...');
    
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ message }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText
      });
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.text();
    console.log('Raw server response:', rawData);

    if (!rawData) {
      throw new Error('Empty response from server');
    }

    let data;
    try {
      data = JSON.parse(rawData);
    } catch (e) {
      console.error('Failed to parse server response:', rawData);
      throw new Error('Invalid response from server');
    }

    if (!data || typeof data.response !== 'string') {
      console.error('Unexpected response format:', data);
      throw new Error('Server returned unexpected response format');
    }

    return data.response;
  } catch (error) {
    // Log the full error details
    console.error('Chat API Error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      apiUrl: API_URL
    });
    
    // Throw a user-friendly error
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to AI server. Please check your connection and try again.');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
} 