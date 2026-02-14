import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import PreLandingGate from "./components/PreLandingGate"
import About from "./pages/About"
import Resume from "./pages/Resume"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import Blogs from "./pages/Blogs"
import BlogPost from "./pages/BlogPost"
import NewBlog from "./pages/NewBlog"
import Games from "./pages/games/Games"
import NameToBinary from "./pages/games/NameToBinary"

const App = () => {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return <PreLandingGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/new" element={<NewBlog />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/name-to-binary" element={<NameToBinary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
