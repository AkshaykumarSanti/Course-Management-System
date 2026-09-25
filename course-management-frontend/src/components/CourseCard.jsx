import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserProvider } from '../context/UserContext'
import { CourseProvider } from '../context/CourseContext'

const CourseCard = ({ data }) => {
    let {user} = useContext(UserProvider)
    let {deleteById} = useContext(CourseProvider)
  return (
    <div className="w-full sm:w-[300px] overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      
      <img
        src={data.cImg}
        alt={data.cName}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          {data.cName}
        </h2>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-500">
          {data.cDesc}
        </p>

        <div className="mb-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-600">
            ⏱ {data.cDuration}
          </span>

          <span className="rounded-full bg-purple-100 px-3 py-1 font-medium text-purple-600">
            👨‍🏫 {data.cTrainer}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xl font-bold text-green-600">
            ₹{data.cPrice}
          </span>

         {user?.role == 'user' && <Link to={`/course/${data.id}`} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
            View Course
          </Link>}

              {user?.role == 'admin' && <Link to={`/update/${data.id}`} className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-700">
            Update 
          </Link>}
              {user?.role == 'admin' && <button onClick={()=>deleteById(data.id)} className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700">
            Delete 
          </button>}
        </div>
      </div>
    </div>
  )
}

export default CourseCard



//! https://codeshare.io/proj1