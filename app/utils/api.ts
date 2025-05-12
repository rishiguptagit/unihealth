const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function chatWithAI(message: string) {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error chatting with AI:', error);
    throw error;
  }
} 