import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SearchBar from '../../components/students/SearchBar';
import { AppContext } from "../../context/AppContext";
import CourseCard from '../../components/students/CourseCard';

const CoursesList = () => {
  const {input} = useParams();
  const {allCourses} = useContext(AppContext)
  console.log(allCourses)
  const [filteredCourse,setFilteredCourse] = useState([])

  useEffect(()=>{
    if(allCourses && allCourses.length > 0){
      let tempCourses = allCourses.slice() |

      (input && input.trim() !== "") ? 
      setFilteredCourse(tempCourses.filter(item=> item.CourseTitle && item.CourseTitle.toLowerCase().includes(input.toLowerCase())))
      :setFilteredCourse(tempCourses)
    }else {
      setFilteredCourse([]);
    }

  },[allCourses,input])


  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
          <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
          <p className="text-gray-500"><span className="text-blue-600 cursor-pointer" onClick={()=>Navigate('/')}>Home</span> / <span>Course List</span></p>
          </div>
          <SearchBar data={input}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {
            filteredCourse.map((course,index)=><CourseCard key={index} course={course}/>)
          }
        </div>
      </div>
    </>
  );
};

export default CoursesList;
