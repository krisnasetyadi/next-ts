// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getServerSession} from 'next-auth/next'
import{ authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 if(req.method === 'POST'){
    const session = await getServerSession(req, res, authOptions)
    if(!session) return res.status(401).json({message: 'Please sign in to make a post'})
    const prismaUser = await prisma.user.findUnique({
        where: {
            email: session?.user?.email
        },
    })

    try {
        const {postId, title} = req.body.data
        if(!title.length) {
            return res.status(401).json({message: 'Please enter somthing'})
        }
        const result = await prisma.comment.create({
            data: {
              title,
              userId: prismaUser.id,
              postId,
            },
        })
        res.status(200).json(result)
    }catch(err){
        res.status(403).json({err: 'Error has occured while create Data'})
    }
 }
}