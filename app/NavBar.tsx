'use client'

import React from 'react'
import Link from 'next/link';
import { AiOutlineIssuesClose } from "react-icons/ai";
import { usePathname } from 'next/navigation'; //Since { usePathname } is a React hook provided my Nextjs and these client hooks can only be rendered in client browser. We need to convert this component to 'use client' 
import classnames from 'classnames'; //classnames({}) is a function that accepts objects that contains classNames/Css property names and give condtion to apply each of them. This is cleaner & managable rather than using ternary condition in classNames design
import UserMenu from './components/UserMenu';
import { Flex } from '@radix-ui/themes';

const NavBar = () => {
  const currentPath = usePathname(); //To get the current page address (useful for verifying active link and dynamically change design conditionally)
  //console.log(currentPath);

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between'>
      <Flex align='center' gap='5'>
        <Link href='/'><AiOutlineIssuesClose /></Link>
        <ul className='flex space-x-6'>
          {links.map((link) => <Link key={link.href} className={classnames({
                                                                            'text-zinc-900': link.href === currentPath,
                                                                            'text-zinc-500': link.href !== currentPath,
                                                                            'hover:text-zinc-800 translate-colors': true,
                                                                            }
                                                                          )} href={link.href}>{link.label}</Link>)}
        </ul>
      </Flex>

      <UserMenu />
    </nav>
  )
}

export default NavBar