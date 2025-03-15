import React, { useState } from "react";
import { assets } from "../../assets/assets";
import uniqid from 'uniqid';

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseHeadings, setCourseHeadings] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [discount,setDiscount] = useState(0)
  const [chapters,setChapters] = useState([])
  const [showPopup,setShowPopup] = useState(false)
  const [currentChapterId,setCurrentChapterId] = useState(null)
  const [lectureDetails,setLectureDetails] = useState(
    {
      lectureTitle:'',
      lectureDuration:'',
      lectureUrl:'',
      isPreviewFree: false,
    }
  )
  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };
  const handleChapter = (action,chapterId) =>{
    if(action === 'add'){
      const title = prompt('Enter chapter name:');
      if (title){
        const newChapter = {
          chapterId:uniqid(),
          chapterTitle:title,
          chapterContent:[],
          collapsed:false,
          chapterOrder:chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1:1,
        };
        setChapters([...chapters,newChapter]);
      } 
    }
    else if(action === 'remove'){
      setChapters(chapters.filter((chapter)=>chapter.chapterId !== chapterId));
    } else if(action === 'toggle'){
      setChapters(
        chapters.map((chapter)=>chapter.chapterId === chapterId ? {...chapter,collapsed: !chapter.collapsed} : chapter)
      )
    }
  }

  const handleLecture = (action,chapterId,lectureIndex) => {
    if(action ==='add'){
      setCurrentChapterId(chapterId)
      setShowPopup(true);
    }
    else if(action === 'remove'){
      setChapters(
        chapters.map((chapter)=>{
          if(chapter.chapterId === chapterId){
            chapter.chapterContent.splice(lectureIndex,1);
          }
          return chapter
        })
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ courseTitle, courseHeadings, courseDescription, coursePrice, thumbnail ,discount});
    
    setCourseTitle("");
  setCourseHeadings("");
  setCourseDescription("");
  setCoursePrice(0);
  setThumbnail(null);
  setDiscount(0)
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-normal">Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Type here"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-normal">Course Headings</label>
          <input
            type="text"
            value={courseHeadings}
            onChange={(e) => setCourseHeadings(e.target.value)}
            placeholder="Type here"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-normal">Course Description</label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="Type here"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center space-x-3">
          <div>
            <label className="block mb-1 font-normal">Course Price</label>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-20"
            />
          </div>
          <div>
            <label className="block mb-1 font-normal">Discount %</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-20"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">Course Thumbnail</label>
            <input type="file" onChange={handleThumbnailUpload} className="hidden" id="thumbnailInput" />
            <label htmlFor="thumbnailInput" className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded flex items-center">
              📤 Upload
            </label>
            {thumbnail && <img src={thumbnail} alt="Thumbnail" className="w-16 h-16 mt-2 rounded" />}
          </div>
        </div>
        {/* Adding Chapters & Lectures */}
        <div>
          {chapters.map((chapter,chapterIndex) => (
            <div key={chapterIndex} className="bg-white border rounded-lg mb-4">
              <div className="flex justify-between items-center p-4 border-b">
                 <div className="flex items-center">
                  <img src={assets.dropdown_icon} width={14} alt="" className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-900"}`} />
                  <span className="font-semibold">{chapterIndex + 1} {chapter.chapterTitle}</span>
                 </div>
              </div>
              <span className="text-gray-500">{chapter.chapterContent.length} Lectures</span>
              <img src={assets.cross_icon} alt="" className="cursor-pointer" />

              {!chapter?.collapsed && (
              <div className="p-4">
                {chapter.chapterContent.map((lecture, lectureIndex) => (
                  <div key={lectureIndex} className="flex justify-between items-center mb-2">
                    <span>
                      {lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                      <a href={lecture.lectureUrl} target="_blank" className="text-blue-500"> Link </a> - 
                      {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                    </span>
                    <img src={assets.cross_icon} className="cursor-pointer" alt="" onClick={()=>handleLecture('remove',chapter.chapterId,lectureIndex)}/>
                  </div>
                ))}
                <div className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2" onClick={()=>handleLecture('add',chapter.chapterId)}>
                  + Add Lectures
                </div>
              </div>
            )}
            </div> 
          ))}
          <div className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2" onClick={()=>handleChapter('add')}>
            + Add Chapter
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input type="text" className="mt-1 block w-full border rounded py-1 px-2" value={lectureDetails.lectureTitle} onChange={(e)=>setLectureDetails({...lectureDetails,lectureTitle: e.target.value})}/>
                </div>
                <div className="mb-2">
                  <p>Duration (minutes)</p>
                  <input type="number" className="mt-1 block w-full border rounded py-1 px-2" value={lectureDetails.lectureDuration} onChange={(e)=>setLectureDetails({...lectureDetails,lectureDuration: e.target.value})}/>
                </div>
                <div className="mb-2">
                  <p>Lecture Url</p>
                  <input type="text" className="mt-1 block w-full border rounded py-1 px-2" value={lectureDetails.lectureUrl} onChange={(e)=>setLectureDetails({...lectureDetails,lectureUrl: e.target.value})}/>
                </div>
                <div className="mb-2">
                  <p>Is Preview Free?</p>
                  <input type="checkbox" className="mt-1 block w-full border rounded py-1 px-2" value={lectureDetails.isPreviewFree} onChange={(e)=>setLectureDetails({...lectureDetails,isPreviewFree: e.target.checked})}/>
                </div>
                <button type="button" className="w-full bg-blue-400 text-white px-4 py-2 rounded">Add</button>

                <img onClick={()=>setShowPopup(false)} src={assets.cross_icon} className="absolute top-4 right-4 w-4 cursor-pointer" alt="" />
              </div>
            </div>
          )}
        </div>

        <button onClick={handleSubmit} type="submit" className="w-full bg-black text-white py-2 rounded text-lg font-semibold hover:bg-gray-800">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;

