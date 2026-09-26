import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CourseProvider } from "../context/CourseContext";

const CourseDetails = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

  const { findById, addToCart } = useContext(CourseProvider);
  const { id } = useParams();

  useEffect(() => {
    setCourseData(findById(id));
  }, [id, findById]);

  if (!courseData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700">
            Course Not Found
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Back */}
      <div className="mx-auto mb-4 max-w-4xl">
        <Link
          to="/"
          className="text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Back to Courses
        </Link>
      </div>

      {/* Main Card */}
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 p-6">
            <img
              src={courseData.cImg}
              alt={courseData.cName}
              className="h-56 w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center p-6">
            <span className="mb-2 text-xs font-semibold uppercase text-blue-600">
              Course Details
            </span>

            <h1 className="mb-3 text-2xl font-bold text-gray-900">
              {courseData.cName}
            </h1>

            <p className="mb-5 text-sm leading-6 text-gray-600">
              {courseData.cDesc}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="mt-1 font-semibold text-blue-700">
                  ⏱ {courseData.cDuration}
                </p>
              </div>

              <div className="rounded-lg bg-purple-50 p-3">
                <p className="text-xs text-gray-500">Trainer</p>
                <p className="mt-1 font-semibold text-purple-700">
                  👨‍🏫 {courseData.cTrainer}
                </p>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{courseData.cPrice}
                </p>
              </div>

              <button
                onClick={() => addToCart(courseData)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="mx-auto mt-6 max-w-4xl rounded-xl bg-white p-5 shadow">
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          About This Course
        </h2>

        <p className="text-sm leading-6 text-gray-600">
          {courseData.cDesc}
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;