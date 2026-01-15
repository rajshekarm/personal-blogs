import { NavLink } from "react-router-dom"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-2 py-1 text-sm font-medium transition border-b-2 ${
    isActive
      ? "text-[#dadde4] border-[#042161]"
      : "text-white border-transparent hover:text-[#6d95c2]"
  }`


const Navbar = () => {
  return (
    <nav className="h-16 flex items-center justify-between px-10  bg-[#25537e]">
      {/* Name / Brand */}
      <h1 className="text-lg font-semibold text-white">
        Rajashekar Mudigonda 
      </h1>
      <p className=" font-semibold text-white" >Software Engineer</p>
      {/* Navigation Links */}
      <div className="flex items-center space-x-2">
        <NavLink to="/" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/resume" className={linkClass}>
          Resume
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          Projects
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>
        <NavLink to="/blogs" className={linkClass}>
          Blogs
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
