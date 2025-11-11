"use client";

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname

function Header() {
  const pathname = usePathname(); // Get the current URL path

  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      <UserButton />
    </div>
  );
}

export default Header;
