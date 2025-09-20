'use client';

import { useSession } from 'next-auth/react';
import { Card, Heading, Text } from '@radix-ui/themes';

const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <Heading mb="4">Profile</Heading>
      <Card>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={session.user?.image || ''}
            alt={session.user?.name || 'User'}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <Text weight="bold">{session.user?.name}</Text>
            <Text color="gray">{session.user?.email}</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;