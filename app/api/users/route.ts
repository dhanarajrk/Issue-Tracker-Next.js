import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/authOptions";
import prisma from "@/prisma/client";


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions); //

    if(!session){
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }

    //fetch all the users with selected fields only (Meaning users will contain only the fields that is specified in select: )
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
        orderBy: {name: 'asc'}
    });

    return NextResponse.json(users);
}