import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: Promise<{ id: string }> //The key {id} comes from the dynamic route folder name [id]. (Eg: For /issues/list/23, params would be { id: "23" } 
}                                 //We have to set it as Promise<> so that await params must be waited first to get the {id} 

const IssueDetailPage = async ({ params }: Props) => { //Next.js automatically extracts URL parameters and passes them as params in Props
  const { id } = await params; //must await here since params is Promise<{ id: string }>

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
    include: {
      assignedTo: {
        select: {
          name: true,
          email: true,
        }
      }
    }
  })

  if (!issue) {
    return <div>Issue not found</div>
  }


  return (
    <div>
      <Heading>{issue.title}</Heading>

      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card className="prose mt-4">
        <Text>{issue.description}</Text>
      </Card>

      {issue.assignedTo && (
        <Card mt="4">
          <Heading size="3">Assigned To</Heading>
          <Text>
            {issue.assignedTo.name || issue.assignedTo.email}
          </Text>
        </Card>
      )}

      <Button mt="4">
        <Link href={`/issues/list/${issue.id}/edit`}>Edit Issue</Link>
      </Button>
    </div>
  )
}

export default IssueDetailPage