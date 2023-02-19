'use client'

import Image from 'next/image'
import { useState } from 'react'
import Toggle from './Toggle'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

type EditProps = {
    id: string
    avatar: string
    name: string
    title: string
    comments?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPost({avatar, name, title,comments, id}: EditProps) {
    const [toggle, setToggle] = useState(false)
    const queryClient = useQueryClient()
    let deleteToastId: string
    const {mutate} = useMutation(
        async (id: string) => await axios.delete('/api/posts/deletePost', {data:id}),
        {
            onError: (error) => {
                toast.error('Erorr deleteing this post', {id: deleteToastId})
            },
            onSuccess: (data) => {
                toast.success('Post has been deleted.', {id: deleteToastId})
                queryClient.invalidateQueries(['auth-posts'])
            }
        }
    )
    const deletePost = () => {
        deleteToastId = toast.loading('Deleting your post', {id: deleteToastId})
        mutate(id)
    }
        return (
            <>
            <div className='bg-white my-8 p-8 rounded-lg'>
                <div className='flex item-center gap02'>
                    <Image width={33} height={33} src={avatar} alt="avatar" />
                    <h3 className='font-bold text-gray-700'>{name}</h3>
                </div>
                <div className='my-8'>
                    <p className='break-all'>{title}</p>
                </div>
                <div className='flex item-center gap-4'>
                    <p className='text-sm font-bold text-gray-700'>
                        {comments?.length} Comments
                    </p>
                    <button onClick={()=> setToggle(true)} className='text-sm font-bold text-red-500'>Delete</button>
                </div>
            </div>
           {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} /> } 
            </>
        )
}