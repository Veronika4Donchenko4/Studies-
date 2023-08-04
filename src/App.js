import "./App.css";
import Posts from './components/posts/Posts';
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users/Users";
import Header from "./components/Header/Header";
import ErrorPage from "./general/ErrorPage/ErrorPage";
import Photos from "./components/Photos/Photos";

function App() {

  return (
    <div>
      <Header />
      <div className="container-wrapper">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}


