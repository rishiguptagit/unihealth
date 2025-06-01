import { PrismaClient } from "../../../prisma/client";

const prisma = new PrismaClient();


export async function PATCH(request: Request) {
    const body = await request.json();
    const { email, firstName, lastName} = body;
    try {
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                firstName: firstName,
                lastName: lastName
            }
        })

        return new Response("User updated successfully", { status: 200 });

    } catch (error) {
        console.error('Error updating user:', error);
        return new Response('Internal server error', { status: 500 });
    }
}
