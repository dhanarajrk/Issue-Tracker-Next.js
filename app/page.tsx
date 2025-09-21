import { Container, Flex, Box } from '@radix-ui/themes';
import IssueMetrics from './components/IssueChart';
import LatestIssues from './components/LatestIssues';

export default function Home() {
  return (
    <Container size="4" p="6">
      <Flex direction={{ initial: 'column', md: 'row' }} gap="6">
        <Box style={{ flex: 1 }}>
          <IssueMetrics />
        </Box>
        <Box style={{ flex: 1 }}>
          <LatestIssues />
        </Box>
      </Flex>
    </Container>
  );
}