import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CourseProvider } from "../context/CourseContext";

const CourseDetails = () => {
  let navigate = useNavigate()
  const [courseData, setCourseData] = useState(null);

  const { findById } = useContext(CourseProvider);
  const { id } = useParams();

  useEffect(() => {
    setCourseData(findById(id));
  }, [id, findById]);

  if (!courseData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Course Not Found</h2>

          <button
           onClick={()=>navigate(-1)}
            className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      {/* Back Button */}
      <div className="mx-auto mb-6 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        >
          ← Back to Courses
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Course Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px]">
            <img
              src={courseData.cImg}
              alt={courseData.cName}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6">
              <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                Featured Course
              </span>
            </div>
          </div>

          {/* Course Information */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <span className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Course Details
            </span>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              {courseData.cName}
            </h1>

            <p className="mb-8 text-base leading-7 text-gray-600">
              {courseData.cDesc}
            </p>

            {/* Course Info */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Duration */}
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="mb-1 text-sm text-gray-500">Duration</p>

                <p className="font-bold text-blue-700">
                  ⏱ {courseData.cDuration}
                </p>
              </div>

              {/* Trainer */}
              <div className="rounded-xl bg-purple-50 p-4">
                <p className="mb-1 text-sm text-gray-500">Trainer</p>

                <p className="font-bold text-purple-700">
                  👨‍🏫 {courseData.cTrainer}
                </p>
              </div>
            </div>

            {/* Price Section */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <div>
                <p className="text-sm text-gray-500">Course Price</p>

                <p className="text-3xl font-extrabold text-green-600">
                  ₹{courseData.cPrice}
                </p>
              </div>

              <button className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mx-auto mt-8 max-w-6xl rounded-2xl bg-white p-6 shadow-md sm:p-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          About This Course
        </h2>

        <p className="leading-7 text-gray-600">{courseData.cDesc}</p>
      </div>
    </div>
  );
};

export default CourseDetails;
