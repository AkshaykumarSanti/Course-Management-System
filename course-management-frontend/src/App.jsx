import React from "react";
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import Layout from "./pages/Layout";
import CourseList from "./pages/CourseList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddCourse from "./pages/AddCourse";
import PageNotFound from "./pages/PageNotFound";
import CourseDetails from "./pages/CourseDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import UpdateCourse from "./pages/UpdateCourse";

let myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute>
          <CourseList />
        </ProtectedRoute>,
      },
      {
        path: "/cart",
        element:<ProtectedRoute>
           <Cart />
        </ProtectedRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/addcourse",
        element: <PrivateRoute>
          <AddCourse />
        </PrivateRoute>,
      },
      {
        path: "/course/:id",
        element: <ProtectedRoute>
          <CourseDetails />
        </ProtectedRoute>,
      },
      {
        path: "/update/:id",
        element: <PrivateRoute>
          <UpdateCourse />
        </PrivateRoute>,
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={myRouter}></RouterProvider>;
};

export default App;



// /dashboard/settings
// /dahsboard/profile


// /course/101
// /course/102

// /course/:id


// course/102
// function CourseDetails(){
//   let {id} = useParams()
//   console.log(id);//102
// }

// {
//   path:'/course/:id',
//   element:<CourseDetails/>
// }

// authentecated/logged-in users
// login -> route -> display