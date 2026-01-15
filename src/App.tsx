import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Resume from "./pages/Resume"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import Blogs from "./pages/Blogs"
import BlogPost from "./pages/BlogPost"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
