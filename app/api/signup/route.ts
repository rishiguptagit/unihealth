import { PrismaClient } from  "../../../prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body; // password is already hashed

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return new Response('Email already registered', { status: 400 });
        }

        // Create new user with already-hashed password
        const user = await prisma.user.create({
            data: {
                email,
                password // Already hashed from client
            }
        });

        return new Response('User created successfully', { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response('Failed to create user', { status: 500 });
    }
}
