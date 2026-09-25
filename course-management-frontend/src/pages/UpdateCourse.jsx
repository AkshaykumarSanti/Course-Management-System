import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { v4 as randomId } from "uuid";
import { CourseProvider } from "../context/CourseContext";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = () => {
  let { findById, handleUpdateCourse } = useContext(CourseProvider);
  let { id } = useParams();
  let navigate = useNavigate();
  const [cDetails, setCDetails] = useState({
    cName: "",
    cPrice: "",
    cImg: "",
    cTrainer: "",
    cDesc: "",
    cDuration: "",
  });

  useEffect(() => {
    setCDetails(findById(id));
  }, [id]);

  const { cDesc, cDuration, cImg, cName, cPrice, cTrainer } = cDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCDetails({
      ...cDetails,
      [name]: value,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.put(`http://localhost:5000/courses/${id}`, cDetails);
    console.log(res);
    if (res.status == 200) {
      toast.success("Course Updated Successfully");
      handleUpdateCourse(res.data);
      navigate('/')
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Update Course
        </h1>

        <p className="mb-8 text-center text-sm text-gray-500">
          Fill in the details to create a new course
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Course Name */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Course Name
            </label>

            <input
              type="text"
              placeholder="Enter course name"
              name="cName"
              value={cName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Image */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Course Image URL
            </label>

            <input
              type="url"
              placeholder="https://example.com/course.jpg"
              name="cImg"
              value={cImg}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Duration
            </label>

            <input
              type="text"
              placeholder="e.g. 3 Months"
              value={cDuration}
              name="cDuration"
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Price
            </label>

            <input
              type="number"
              placeholder="Enter price"
              value={cPrice}
              name="cPrice"
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Trainer */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Trainer
            </label>

            <input
              type="text"
              placeholder="Enter trainer name"
              value={cTrainer}
              name="cTrainer"
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              placeholder="Enter course description"
              name="cDesc"
              value={cDesc}
              onChange={handleChange}
              required
              rows="4"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-7 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
