'use client';

import { SessionProvider } from 'next-auth/react';  // SessionProvider makes user login state (signed in/out + session data) available to all components. 
                                                    //How do SessionProvider knows from where to fetch authenticated session data?? By default {SessionProvider} will always hit /api/auth/.../route.ts path to fetch authenticated Session Datas.

export default function AuthProvider({children} : {children: React.ReactNode;}){ //direct type way instead of creating type/interface above 
    return <SessionProvider>{children}</SessionProvider>   //It wraps the app so all children can access the user's session data (in layout.tsx)
}