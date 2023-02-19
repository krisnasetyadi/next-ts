'use client'
import axios from "axios"
import AddPost from './components/addPost'
import { useQuery } from '@tanstack/react-query'
import Post from './components/Post'
import { PostType } from "./types/Post"

// fetch all data
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPost")
  return response.data
}

export default function Home() {
  // query key allow us ti di some intellegent caching
  // by defauult react query is going to cache all the result for you
  //  if we navigate between pages its not going to refetch again 
  // unless we want to invalidate the querires and we can acces tot his key then and we can invalidate it
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey:['posts'],
  })
  if(error) return error
  if(isLoading) return "Loading..."
  return (
    <main>
     <AddPost />
     {data?.map(data => (
      <Post 
        comments={data.comments}
        key={data.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        id={data.id}
      />
     ))}
    </main>
  )
}
