"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {
    const { data: session } = useSession();
    const [post, setPost] = useState([])
    const router=useRouter();
    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPost(data);
        }

        if (session?.user.id) {
            fetchPost();
        }
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed=confirm("Are you sure want to delete this prompt ? ");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:"DELETE"
                })

                const filteredPost=post.filter((p)=>p._id!==post._id);

                setPost(filteredPost);

                alert("It will deleted soon")
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name={"My"}
            description="Welcome to your personalized profile page"
            data={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile