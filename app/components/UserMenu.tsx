'use client';

import { Avatar, Button, DropdownMenu } from '@radix-ui/themes';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserMenu = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') return null;

    if (session) {
        return (
            <DropdownMenu.Root>

                <DropdownMenu.Trigger>
                    <Button variant="ghost" className="p-0 h-auto">
                        <Avatar src={session.user?.image || ''}
                            fallback={session.user?.name?.charAt(0) || 'U'}
                            size='2'
                            radius='full'
                            className='cursor-pointer'
                        />
                    </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        {session.user?.email}
                    </DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onClick={() => router.push('/profile')}>
                        Profile
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={() => signOut({callbackUrl: '/'}) }>
                        Log out
                    </DropdownMenu.Item>
                </DropdownMenu.Content>

            </DropdownMenu.Root>
        );
    }

    return (
        <Button onClick={() => signIn('google')}>
            Sign in with Google
        </Button>
    )
}

export default UserMenu