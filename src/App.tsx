import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Resume from "./pages/Resume"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import Blogs from "./pages/Blogs"
import BlogPost from "./pages/BlogPost"
import NewBlog from "./pages/NewBlog"
import Games from "./pages/games/Games"
import Artion from "./pages/Artion"
import NameToBinary from "./pages/games/NameToBinary"
import MultiLeadTransformerLab from "./pages/MultiLeadTransformerLab"
import ECGTriageIntelligence from "./pages/ECGTriageIntelligence"

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
        <Route path="/blogs/new" element={<NewBlog />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/artion" element={<Artion/>}/>
        <Route path="/projects/ecg-triage-intelligence" element={<ECGTriageIntelligence />} />
        <Route path="/games" element={<Games />} />
        <Route path="/artionNextGen" element={<MultiLeadTransformerLab />} />

        <Route path="/games/name-to-binary" element={<NameToBinary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
