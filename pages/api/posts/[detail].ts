// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 if(req.method === 'GET'){
    try {
        const data = await prisma.post.findUnique({
            where: {
                id: req.query.detail,
            },
            include: {
                user: true,
                comments: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        user: true,
                    }
                }
            }
        })
        res.status(200).json(data)
    }catch(err){
        res.status(403).json({err: 'Error has occured while get Data'})
    }
 }
}