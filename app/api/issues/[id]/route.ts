import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patchIssueSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import { error } from "console";

interface Props {
    params: Promise<{id: string}>; //expected issue ID type from URL params 
}

//GET (to fetch a single issue for EditIssuePage)
export async function GET(request: NextRequest, { params }: Props) {
    //check session
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    //retrieve issue data for a user ID
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
        include: {
            assignedTo:{
                select:{
                    id:true,
                    name: true,
                    email: true,
                }
            }
        }
    });

    if (!issue) {
        return NextResponse.json({ error: 'Issue not found' }, { status: 400 });
    }

    return NextResponse.json(issue);
}


//PATCH (updating issue in DB)
export async function PATCH(request: NextRequest, { params }: Props) { //accept PATCH request and also extracts the {params} which contains issueID from Props
    //check session
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    //Find and update a user ID's issue data
    const { id } = await params;
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    //Search for requested issue ID 
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })

    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
    }

    //Update the issue fields:
    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description,
            status: body.status,
            assignedToUserId: body.assignedToUserId || null
        }
    });

    return NextResponse.json(updatedIssue);
}


//DELETE (to delete an issue from DB)
export async function DELETE(request: NextRequest, { params }: Props) {
    //check session
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //Find current session user to check its role and to see if he can delete it:
    const currentUser = await prisma.user.findUnique({
        where: { email: session.user!.email! }
    });

    if(!currentUser) {
        return NextResponse.json({error: "Current User not found"}, {status:404});
    }

    //Then get Who Created the issue (Only those User who raised the Issue OR Admin can Delete it)
    const { id } = await params; //issue Id passed down from params
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
        include:{
            createdBy: { //Include the creatorID information
                select:{
                    id: true //this id is creatorID
                }
            }
        }
    });

    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
    }

    // Delete Authorization: Only allow if user is ADMIN or created the issue
    if(currentUser.role!=='ADMIN' && issue.createdById !==currentUser.id) {
        return NextResponse.json(
            { error: 'You can only delete your own issues' }, 
            { status: 403 } //Forbidden
        );
    }
    
    await prisma.issue.delete({
        where: { id: issue.id }
    });

    return NextResponse.json({});
}