import prisma from '@/prisma/client';
import { Card, Text, Flex, Badge, Box } from '@radix-ui/themes';
import Link from 'next/link';

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    select: { 
      id: true, 
      title: true, 
      status: true,
      createdAt: true
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'red';
      case 'IN_PROGRESS': return 'blue';
      case 'CLOSED': return 'green';
      default: return 'gray';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <Text size="5" weight="bold" mb="4">Latest Issues</Text>
      
      {latestIssues.length === 0 ? (
        <Box p="6">
          <Text color="gray" align="center">No issues found</Text>
        </Box>
      ) : (
        <Flex direction="column" gap="3">
          {latestIssues.map((issue) => (
            <Link key={issue.id} href={`/issues/list/${issue.id}`} style={{ textDecoration: 'none' }}>
              <Card variant="surface" style={{ cursor: 'pointer' }} className="hover:shadow-md transition-shadow">
                <Flex justify="between" align="center" p="3">
                  <Flex direction="column" gap="1" style={{ flex: 1, minWidth: 0 }}>
                    <Text size="3" weight="medium" truncate style={{ color: 'inherit' }}>
                      {issue.title}
                    </Text>
                    <Text size="2" color="gray">
                      {formatDate(issue.createdAt)}
                    </Text>
                  </Flex>
                  
                  <Badge 
                    color={getStatusColor(issue.status)} 
                    variant="soft"
                    ml="3"
                  >
                    {issue.status.replace('_', ' ')}
                  </Badge>
                </Flex>
              </Card>
            </Link>
          ))}
        </Flex>
      )}
    </Card>
  );
};

export default LatestIssues;