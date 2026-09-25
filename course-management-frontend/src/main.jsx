import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
let root = ReactDOM.createRoot(document.getElementById("root"));
import { Toaster } from "react-hot-toast";
import UserContext from "./context/UserContext";
import CourseContext from "./context/CourseContext";

root.render(
  <UserContext>
   <CourseContext>
     <App />
    <Toaster />
   </CourseContext>
  </UserContext>,
);
