'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Post from "@/app/components/Post"
import { PostDetailType } from '@/app/types/PostDetails'
import AddComment from '@/app/components/addComment'
import Image from 'next/image'

type URL = {
    params: {
        slug: string
    }
}

const getDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url: URL){
    const {data, isLoading} = useQuery<PostDetailType[]>({
        queryFn: () => getDetails(url.params.slug) ,
        queryKey: ['detail-post']
    })
    if(isLoading) return "Loading..."
    return (
        <div>
            <Post 
              id={data.id}
              name={data.user.name}
              avatar={data.user.image}
              postTitle={data.title}
              comments={data.comments}
            />
        <AddComment id={data?.id} />
        {data?.comments?.map(c => (
            <div key={c.id} className='my-6 bg-white p-8 rounded-md'>
                <div className='flex items-center gap-2'>
                    <Image
                      width={24}
                      height={24}
                      src={c.user?.image}
                      alt="avatar"    
                    />
                <h3 className='font-bold'>{c?.user?.name}</h3>
                <h2 className='text-sm'>{c.createdSt}</h2>
                </div>
                <div className='py-6'>{c.title}</div>
            </div>
        ))}
        </div>
    )
}