import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Button, Flex, Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'
import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams?: Promise<{ page?: string }> //Since Page params may exist or not exist at all, so its safer to pre check
}

const IssuesListPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams; //Await searchParams Promise before using
  const page = parseInt(resolvedParams?.page || "1"); //safe fallback value to page 1 if params has no page value (meaning its obviously page 1) otherwise convert searchParams={ page: "3"} string to 3 int
  const pageSize = 10; //Total No. of records to be shown per page

  //Fetch 10 issue records to be shown in the current page:
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,  //How many issue records to be skipped in Page 3 → skip = (3 - 1) * 10 = 20 → skip the first 20 issues. 
    take: pageSize, //Tells Prisma how many records to fetch/take after skipping (ie. 10 pages after skipped records)
  });

  const issueCount = await prisma.issue.count(); //Total isue records in DB


  return (
    <div className='space-y-4'>

      <Flex justify='end'>
        <Button><Link href='/issues/new'>New Issue</Link></Button>
      </Flex>

      <Table.Root variant='surface' className='mt-5'>

        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/list/${issue.id}`} className='text-violet-900 hover:text-violet-500'>{issue.title}</Link>
              </Table.Cell>

              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>

              <Table.Cell>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

      </Table.Root>

      {/* Pagination section */}
      <Flex justify="center">
        <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
      </Flex>

    </div>
  )
}

export default IssuesListPage