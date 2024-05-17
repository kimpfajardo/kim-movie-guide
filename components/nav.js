import React from 'react'
import Link from 'next/link'

const Nav = () => (
  <nav className="fixed top-0 z-10 w-full h-20 px-10 bg-white shadow-md shadow-white">
    <ul className="flex items-center justify-center w-full h-full">
      <li>
        <Link
          href="/"
          className="p-2 px-3 transition rounded-full hover:bg-gray-100"
        >
          Home
        </Link>
      </li>
    </ul>
    <hr />
  </nav>
);

export default Nav
