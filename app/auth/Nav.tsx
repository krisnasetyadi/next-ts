import React from "react"
import Link from "next/link"
import Login from "./Login"
import {getServerSession} from 'next-auth/next'
import{authOptions} from '../../pages/api/auth/[...nextAuth]'
import Logged from "./Logged"

export default async function Nav() {
    const session = await getServerSession(authOptions)

    return (
        <nav className="flex justify-between item-center py-8">
            <div className="flex-1"/>
            <ul className="flex items-center gap-6">
              <li>
                {session?.user && (
                <>      
                <Logged image={session.user?.image || ""}/>
                <h1>{session.user.name}</h1>
                </>
                )}
                {!session?.user && <Login />}
              </li>
            </ul>
        </nav>
    )
}