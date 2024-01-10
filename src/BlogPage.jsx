import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"
import { AppContext } from './context/AppContext';
import { baseUrl } from './baseUrl';
import { useContext } from 'react';
import Header from './components/Header';
import BlogDetails from './components/BlogDetails';

const BlogPage = () => {
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog, setBlog] = useState(null);
    const[relatedblogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const {setLoading, loading} = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        console.log("URL is: ");
        console.log(url);
        try {
            const res = await fetch(url);
            const data = await res.json();
            
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error) {
            console.log("Error aagya in blog id wali call");
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect( () => {
        if(blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname] )

  return (
    <div className="w-full flex flex-col gap-y-1 justify-center items-center mt-[90px]">
      <Header/>
      <div className="flex items-center gap-x-3 w-11/12 max-w-2xl mx-auto">
        <button className="border-2 border-gray-300 py-1 px-4 rounded-md"
        onClick={() => navigation(-1)}
        >
            Back
        </button>
      </div>
      {
        loading ?
        (<div className="min-h-[80vh] w-full flex justify-center items-center">
            <p className="text-center font-bold text-3xl"> Loading</p>
        </div>) :
        blog ?
        (<div className='w-11/12 max-w-[670px] py-8 flex flex-col gap-y-7 mb-[70px] justify-center items-center'>
            <BlogDetails post={blog} />
            <h2 className="font-bold text-2xl "> Related Blogs </h2>
            {
                relatedblogs.map( (post) => (
                    <div key = {post.id}>
                        <BlogDetails post={post} />
                    </div>
                ) )
            }

        </div>) :
        (<div>
            <p>No Blog Found</p>
        </div>)
       
      }


    </div>
  )
}

export default BlogPage
