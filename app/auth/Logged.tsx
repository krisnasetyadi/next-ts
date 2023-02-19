'use client'

import Image from "next/image"
import {signOut} from 'next-auth/react'
import Link from  'next/link'

type User = {
    image: string
}

export default function Logged({image}: User){
    return (
        <li className="flex gap-8 items-center">
          <Link href={'/profile'}>
            <Image width={64} height={64} src={image} alt="image" className="rounded-full" />
          </Link>
          <button onClick={()=>signOut()} className="font-bold bg-gray-700 text-white text-sm px-6 py-2 rounded-md">
             Sign Out
          </button> 
        </li>
    )
}