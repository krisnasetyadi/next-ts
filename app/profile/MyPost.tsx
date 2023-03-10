'use client'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { AuthPosts } from '../types/AuthPosts'
import EditPost from './EditPost'

const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPost')
    return response.data
}

export default function MyPosts(){
    const {data, isLoading} = useQuery<AuthPosts>({
        queryFn: fetchAuthPosts,
        queryKey: ["auth-posts"],
    })
    if(isLoading) return <h1>Loading your post...</h1>
    
    return (
        <div>
            {data?.posts?.map(dt => {
                return <EditPost 
                         id={dt.id}
                         avatar={data.image}
                         key={dt.id}
                         name={data.name}
                         title={dt.title}
                         comments={dt.comments}
                        />
            })}
        </div>
    )
}