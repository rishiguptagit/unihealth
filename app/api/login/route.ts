import { PrismaClient } from "../../../prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return new Response('User not found', { status: 404 });
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return new Response('Invalid credentials', { status: 401 });
        }

        return new Response('Login successful', { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response('Internal server error', { status: 500 });
    }
}
