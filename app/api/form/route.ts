import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { createFormSubmissionsTable, saveFormSubmission } from './db';

export async function POST(request: Request) {
  // First verify database connection
  try {
    await sql`SELECT NOW();`;
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Database connection failed. Please try again later.' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { email, interestedInBeta, features, otherFeature } = body;

    // Ensure the table exists
    await createFormSubmissionsTable();

    // Save the form submission
    const success = await saveFormSubmission({
      email,
      interestedInBeta,
      features,
      otherFeature
    });

    if (!success) {
      throw new Error('Failed to save form submission');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving form submission:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = errorMessage.includes('duplicate key') ? 409 : 500;
    const userMessage = statusCode === 409 
      ? 'This email has already submitted feedback. Please use a different email.'
      : 'Failed to save form submission. Please try again.';

    return NextResponse.json(
      { 
        error: userMessage,
        details: errorMessage
      },
      { status: statusCode }
    );
  }
}
