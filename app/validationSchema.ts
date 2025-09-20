import { z } from "zod";

//Zod schema  → defines your input validation schema (what kind of data your API/frontend accepts).
export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255),
    description: z.string().min(1, 'Description is required!'),
    assignedToUserId: z.string().optional().nullable()
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255).optional(),
    description: z.string().min(1, 'Description is required!').optional(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
    assignedToUserId: z.string().optional().nullable()
})
