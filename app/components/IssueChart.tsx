import prisma from '@/prisma/client';
import { Card, Text, Flex, Grid, Badge } from '@radix-ui/themes';

const IssueChart = async () => {
  const openCount = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgressCount = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closedCount = await prisma.issue.count({ where: { status: 'CLOSED' } });

  const total = openCount + inProgressCount + closedCount;

  const metrics = [
    { label: 'Total', count: total, color: 'gray' },
    { label: 'Open', count: openCount, color: 'red' },
    { label: 'In Progress', count: inProgressCount, color: 'blue' },
    { label: 'Closed', count: closedCount, color: 'green' },
  ];

  return (
    <Card>
      <Text size="5" weight="bold" mb="4">Issue Overview</Text>
      
      <Grid columns="4" gap="4" mb="5">
        {metrics.map((metric) => (
          <Card 
            key={metric.label} 
            variant="surface"
            style={{ 
              backgroundColor: 
                metric.label === 'Open' ? '#fecaca' :
                metric.label === 'In Progress' ? '#bfdbfe' :
                metric.label === 'Closed' ? '#bbf7d0' :
                undefined
            }}
          >
            <Flex direction="column" align="center" p="3">
              <Text size="6" weight="bold">
                {metric.count}
              </Text>
              <Text size="2" color="gray">
                {metric.label}
              </Text>
            </Flex>
          </Card>
        ))}
      </Grid>

      {total > 0 && (
        <Flex direction="column" gap="4">
          <Flex justify="between" align="center">
            <Text size="3">Open Issues</Text>
            <Flex align="center" gap="2">
              <div 
                className="relative w-12 h-12 rounded-full"
                style={{
                  background: `conic-gradient(#dc2626 0% ${(openCount / total) * 100}%, #e5e5e5 ${(openCount / total) * 100}% 100%)`
                }}
              >
                <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                  <Text size="1" weight="bold" style={{ color: '#dc2626' }}>
                    {Math.round((openCount / total) * 100)}%
                  </Text>
                </div>
              </div>
            </Flex>
          </Flex>
          
          <Flex justify="between" align="center">
            <Text size="3">In Progress</Text>
            <Flex align="center" gap="2">
              <div 
                className="relative w-12 h-12 rounded-full"
                style={{
                  background: `conic-gradient(#2563eb 0% ${(inProgressCount / total) * 100}%, #e5e5e5 ${(inProgressCount / total) * 100}% 100%)`
                }}
              >
                <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                  <Text size="1" weight="bold" style={{ color: '#2563eb' }}>
                    {Math.round((inProgressCount / total) * 100)}%
                  </Text>
                </div>
              </div>
            </Flex>
          </Flex>
          
          <Flex justify="between" align="center">
            <Text size="3">Closed</Text>
            <Flex align="center" gap="2">
              <div 
                className="relative w-12 h-12 rounded-full"
                style={{
                  background: `conic-gradient(#16a34a 0% ${(closedCount / total) * 100}%, #e5e5e5 ${(closedCount / total) * 100}% 100%)`
                }}
              >
                <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                  <Text size="1" weight="bold" style={{ color: '#16a34a' }}>
                    {Math.round((closedCount / total) * 100)}%
                  </Text>
                </div>
              </div>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Card>
  );
};

export default IssueChart;