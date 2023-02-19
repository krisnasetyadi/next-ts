'use client'

import { useState } from "react"
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios, { AxiosError } from "axios"
import toast from 'react-hot-toast'

type postProps = {
    id?: string
}

type comments = {
    postId?: string
    title: string
}

export default function AddComment({id}: postProps){
    const [title, setTitle] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    const queryClient = useQueryClient()
    let commentId: string

    const {mutate} = useMutation(
    async (data: comments) => await axios.post('/api/posts/addComment', {data}),
    {
        onError:error => {
            if(error instanceof AxiosError){
                toast.error(error?.response?.data.message, {id: commentId})
            }
            setIsDisabled(false)
        },
        onSuccess:data => {
            toast.success("Comment Added!", {id: commentId})
            queryClient.invalidateQueries(['detail-post'])
            setTitle("")
            setIsDisabled(false)
        }
    })

    const submitComment = async(e:React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        commentId = toast.loading('Loading...', {id: commentId})
        mutate({title, postId: id})
    }

    return (
        <form className="my-8" onSubmit={submitComment}>
          <h2>Add Comment</h2>
          <div className="flex flex-col my-2">
            <input
              onChange={e => setTitle(e.target.value)}
              value={title}
              type="text"
              name="title"
              className="p-4 text-lg rounded-md my-2"
            />
            </div>
            <div className="flex items-center gap-2">
              <button 
                disabled={isDisabled}
                className="text-sm bg-teal-600 text-white py-2 px-4 rounded-xl disabled:opacity-30"
                type="submit">
                Create a Comment
              </button>
              <p 
                className={`font-bold text-sm ${
                title.length > 300 ? 'text-red-700' : 'text-gray-700'
                }`}
              >{`${title.length}/300`}</p>
            </div>
        </form>
    )
}