import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/client/HomePage'
import AboutPage from './Pages/client/AboutPage'
import GalleryPage from './Pages/client/GalleryPage'
import ContactPage from './Pages/client/ContactPage'
import BlogPage from './Pages/client/BlogPage'
import ProgramPage from './Pages/client/ProgramPage'
import ProtectedRoute from './utils/ProtectedRoute'
import Dashboard from './Pages/admin/Dashboard'
import Admin from './Pages/admin/Admin'
import Contact from './Pages/admin/Contact'
import ContactMeet from './component/admin/contact/ContactMeet'
import User from './Pages/client/User'
// import Program from './Pages/admin/Program'
import  Program from "./Pages/admin/Program"
import ProgramView from './Pages/client/ProgramView'
import Blog from './Pages/admin/Blog'
import BlogDetail from './Pages/client/BlogDetail'
import Gallery from './Pages/admin/Gallery'
import Review from './Pages/admin/Review'
import About from './Pages/admin/About'
import Register from './Pages/client/Register'

// here all file is admin
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "./store/slice/userSlice"
import Program from './Pages/admin/program'

function App() {

  const dispatch = useDispatch()
  const { meDetail } = useSelector((state) => state?.user)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  console.log(meDetail, "jgioejfraefsdcfsaev")
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/popular-ngo-program" element={<ProgramPage />} />
        <Route path="/trending-blog" element={<BlogPage />} />
        <Route path="/popular-ngo-program/:id" element={<ProgramView />} />
        <Route path="/trending-blog/:id" element={<BlogDetail />} />
        <Route path="/auth-user" element={<Register />} />


        {/* Protected-route-admin */}
        <Route path="/admin" element={<ProtectedRoute allowedRole={["Admin"]} />}>
          <Route index element={<Admin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contact" element={<Contact />} />
          <Route path="contact/contact-meet" element={<ContactMeet />} />
          {/* <Route path="program" element={<Program />} /> */}
          <Route  path="path" element={<Program/>}/>
          <Route path="blog" element={<Blog />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="review" element={<Review />} />
          <Route path="about" element={<About />} />

        </Route>


        {/* User Protected Routes */}
        <Route path="/user" element={<ProtectedRoute allowedRole={["User", "Admin"]} />}>
          <Route path="dashboard" element={<User />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
