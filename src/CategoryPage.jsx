import React from 'react'
import Header from './components/Header'
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"
import Blogs from './components/Blogs'
import Pagination from './components/Pagination'

const CategoryPage = () => {

    const navigation = useNavigate();
    const location = useLocation();
    const category = location.pathname.split("/").at(-1);

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
                Blogs on <span>#{category}</span>
            </h2>
        </div>
        <Blogs/>
        <Pagination/>
    </div>
  )
}

export default CategoryPage