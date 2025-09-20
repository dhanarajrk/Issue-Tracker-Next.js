import { Badge } from '@radix-ui/themes'
import type { Status } from '@prisma/client'

interface Props {
  status: Status //Same as harcoding: 'OPEN' | 'IN_PROGRESS' | 'CLOSED'
}

const IssueStatusBadge = ({ status }: Props) => {
  const statusMap = {
    OPEN: { label: 'Open', color: 'red' as const },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' as const },
    CLOSED: { label: 'Closed', color: 'green' as const }
  }

  return (
    // To access a dynamic property, we have to use obj[randomStatus].color
    <Badge color={statusMap[status].color}> 
      {statusMap[status].label}
    </Badge>
  )
}

export default IssueStatusBadge