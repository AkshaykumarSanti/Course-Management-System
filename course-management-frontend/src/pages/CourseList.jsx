import React, { useContext } from 'react'
import { CourseProvider } from '../context/CourseContext'
import CourseCard from '../components/CourseCard'

const CourseList = () => {
  let { allCourses } = useContext(CourseProvider)

  return (
    <div className="flex flex-wrap justify-center gap-6 bg-gray-50 p-8">
      {allCourses?.map((course) => {
        return <CourseCard key={course.id} data={course} />
      })}
    </div>
  )
}

export default CourseList
