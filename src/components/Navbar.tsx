import { NavLink, useLocation } from "react-router-dom"
import { useState } from "react"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-2 py-1 text-sm font-medium transition border-b-2 ${
    isActive
      ? "text-[#f3f7ff] border-[#7fb3ff]"
      : "text-white/85 border-transparent hover:text-[#d3e6ff]"
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/8"
  }`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  if (pathname === "/") {
    return null
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-white sm:text-base">
            Rajashekar Mudigonda | Backend Engineer
          </h1>
          <p className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 sm:block">
            Software Engineer
          </p>
        </div>

        <button
          type="button"
          className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>

        <div className="hidden items-center gap-1.5 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/experience" className={linkClass}>
            Experience
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
          <NavLink to="/artion" className={linkClass}>
            Artion
          </NavLink>
          <NavLink to="/artionNextGen" className={linkClass}>
            ECG AI
          </NavLink>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/90 px-4 py-3 md:hidden backdrop-blur-2xl">
          <div className="grid gap-1">
            <NavLink to="/" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/experience" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Experience
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
            <NavLink to="/artion" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Artion
            </NavLink>
            <NavLink to="/artionNextGen" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              ECG AI
            </NavLink>
          </div>
        </div>
      )}
      <div className="hidden md:block" />
    </nav>
  )
}

export default Navbar
