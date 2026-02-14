import { NavLink } from "react-router-dom"
import { useState } from "react"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-2 py-1 text-sm font-medium transition border-b-2 ${
    isActive
      ? "text-[#dadde4] border-[#042161]"
      : "text-white border-transparent hover:text-[#6d95c2]"
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? "bg-[#1d4265] text-white" : "text-white hover:bg-[#1d4265]"
  }`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-[#25537e]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-white sm:text-lg">
            Rajashekar Mudigonda
          </h1>
          <p className="hidden text-xs font-semibold text-white/90 sm:block">
            Software Engineer
          </p>
        </div>

        <button
          type="button"
          className="rounded-md border border-[#3f6a92] px-3 py-1 text-sm font-medium text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>

        <div className="hidden items-center gap-2 md:flex">
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
          <NavLink to="/games" className={linkClass}>
            Games
          </NavLink>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[#3f6a92] px-4 py-3 md:hidden">
          <div className="grid gap-1">
            <NavLink to="/" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to="/resume" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Resume
            </NavLink>
            <NavLink to="/projects" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
            <NavLink to="/blogs" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Blogs
            </NavLink>
            <NavLink to="/games" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Games
            </NavLink>
          </div>
        </div>
      )}
      <div className="hidden md:block" />
    </nav>
  )
}

export default Navbar
