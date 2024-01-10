import React from 'react'
import {useNavigate} from "react-router-dom"
import Header from '../components/Header'
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination'
import {useLocation} from "react-router-dom"

const TagPage = () => {

    const navigation = useNavigate();
    const location = useLocation();
    const tag = location.pathname.split("/").at(-1);
  return (
    <div className="w-full flex flex-col gap-y-1 justify-center items-center mt-[90px]">
        <Header/>
        <div className="flex items-center gap-x-3 w-11/12 max-w-2xl mx-auto">
            <button className="border-2 border-gray-300 py-1 px-4 rounded-md"
            onClick={() => navigation(-1)}
            >
                back
            </button>
            <h2>
                Blogs Tagged <span>#{tag}</span>
            </h2>
        </div>
        <Blogs/>
        <Pagination/>
        </div>
  )
}

export default TagPage