import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import DesktopShell from "./components/DesktopShell"
import About from "./pages/About"
import Resume from "./pages/Resume"
import Education from "./pages/Education"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import Blogs from "./pages/Blogs"
import BlogPost from "./pages/BlogPost"
import NewBlog from "./pages/NewBlog"
import Games from "./pages/games/Games"
import Artion from "./pages/Artion"
import NameToBinary from "./pages/games/NameToBinary"
import ECGTriageIntelligence from "./pages/ECGTriageIntelligence"
import RegulatoryEventReporting from "./pages/RegulatoryEventReporting"
import OrderFlowReliability from "./pages/OrderFlowReliability"

const MAINTENANCE_MODE = true;

const App = () => {
  
  if (MAINTENANCE_MODE) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
       <h1>Hi there, thanks for visiting.</h1>

<p>
  I'm Rajashekar, a Software Engineer with over 5 years of experience building
  customer-facing products and internal tools. I'm passionate about technology
  and currently exploring how AI can be used to solve real-world problems.
</p>
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      <DesktopShell>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/experience" element={<Resume />} />
          <Route path="/resume" element={<Navigate to="/experience" replace />} />
          <Route path="/education" element={<Education />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/new" element={<NewBlog />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/artion" element={<Artion />} />
          <Route path="/projects/ecg-triage-intelligence" element={<ECGTriageIntelligence />} />
          <Route path="/projects/regulatory-event-reporting" element={<RegulatoryEventReporting />} />
          <Route path="/projects/order-flow-reliability" element={<OrderFlowReliability />} />
          <Route path="/games" element={<Games />} />
          <Route path="/artionNextGen" element={<Navigate to="/projects/ecg-triage-intelligence" replace />} />
          <Route path="/games/name-to-binary" element={<NameToBinary />} />
        </Routes>
      </DesktopShell>
    </BrowserRouter>
  )
}

export default App
