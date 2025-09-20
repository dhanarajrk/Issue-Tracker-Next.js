import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = createIssueSchema.safeParse(body); //"Check if this request body matches my zod schema, and give me a clear success/error result as object"
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })  //400 is bad request
    }

    // Find user by email from session
    const user = await prisma.user.findUnique({
        where: { email: session.user!.email! }
    });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //So if body validation is done and logged in session user email is found in DB, the we can create the issue  (but first we have to import prisma client to run prisma command)
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,  //from request body
            description: body.description, //from request body
            createdById: user.id, //current logged-in user fetched from session
            assignedToUserId: body.assignedToUserId || null //from request body, optional can be null
        }
    })

    return NextResponse.json(newIssue, { status: 201 })
}