import axios from "axios";
import React, { useContext, useState } from "react";
import { v4 as randomId } from "uuid";
import { CourseProvider } from "../context/CourseContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  const { handleAddCourse } = useContext(CourseProvider);

  const [cDetails, setCDetails] = useState({
    cName: "",
    cPrice: "",
    cImg: "",
    cTrainer: "",
    cDesc: "",
    cDuration: "",
  });

  const { cDesc, cDuration, cImg, cName, cPrice, cTrainer } = cDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCDetails({
      ...cDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/courses", {
        id: randomId(),
        ...cDetails,
      });

      if (res.status === 201) {
        toast.success("Course Added Successfully");

        handleAddCourse(res.data);
        navigate("/");

        setCDetails({
          cName: "",
          cPrice: "",
          cImg: "",
          cTrainer: "",
          cDesc: "",
          cDuration: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add course");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-3">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-xl bg-white p-5 shadow-md"
      >
        <h1 className="mb-1 text-center text-xl font-bold text-gray-800">
          Add New Course
        </h1>

        <p className="mb-4 text-center text-xs text-gray-500">
          Fill in the course details
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Course Name */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Course Name
            </label>

            <input
              type="text"
              name="cName"
              value={cName}
              onChange={handleChange}
              placeholder="Enter course name"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Image URL */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Course Image URL
            </label>

            <input
              type="url"
              name="cImg"
              value={cImg}
              onChange={handleChange}
              placeholder="https://example.com/course.jpg"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Duration
            </label>

            <input
              type="text"
              name="cDuration"
              value={cDuration}
              onChange={handleChange}
              placeholder="e.g. 3 Months"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="cPrice"
              value={cPrice}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Trainer */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Trainer
            </label>

            <input
              type="text"
              name="cTrainer"
              value={cTrainer}
              onChange={handleChange}
              placeholder="Enter trainer name"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="cDesc"
              value={cDesc}
              onChange={handleChange}
              placeholder="Enter course description"
              rows="2"
              required
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;