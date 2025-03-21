import { createContext, useEffect, useState } from "react";
import {dummyCourses} from "../assets/assets"
import { useNavigate } from "react-router-dom";
import humanize from 'humanize-duration'
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()
  const [allCourses,setAllCourses] = useState([])
  const [isEducator,setIsEducator] = useState(true)
  const [enrolledCourses,setEnrolledCourses] = useState([])


  //fetch all courses
  const fetchAllCourses = async () =>{
    setAllCourses(dummyCourses);
  }

  //calculate avarage rating
  const calculateRating = (course)=>{
    if(course.courseRatings.length === 0){
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach(rating =>{
      totalRating += rating.rating
    })
    return totalRating / course.courseRatings.length
  }

  //Function to calculate course chapter time
  const calculateChapterTime = (chapter)=>{
    let time = 0;
    chapter.chapterContent.map((lecture)=>time += lecture.lectureDuration)
    return humanizeDuration(time * 60 * 1000,{units:["h","m"]})
  }

  //Function to calculate course duration time
  const calculateCourseTime = (course) =>{
    let time = 0 ;
    course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>{
      time += lecture.lectureDuration
    }))
    return humanizeDuration(time *60*1000,{units:["h","m"]})
  }

  //Function to calculate no. of lechtures in the course
  const calculateNoOfLectures = (course)=>{
    let totalLectures = 0;
    if (!course || !Array.isArray(course.courseContent)) return 0;
    course.courseContent.forEach((chapter)=>{
      if(Array.isArray(chapter.chapterContent)){
        totalLectures += chapter.chapterContent.length;
      }
    })
    return totalLectures;
  }

  //fetch enrolled courses
  const fetchEnrollCourses = async () =>{
    setEnrolledCourses(dummyCourses)
  }


  useEffect(()=>{
    fetchAllCourses(),
    fetchEnrollCourses()
  },[])

  const value = {currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,calculateNoOfLectures,calculateCourseTime,calculateChapterTime,enrolledCourses,fetchEnrollCourses};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
