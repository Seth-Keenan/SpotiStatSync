import { Link, useMatch, useResolvedPath } from "react-router-dom"
// Custom Link function is defined by WebDevSimplified
// https://github.com/WebDevSimplified/react-navbar/blob/main/src/Navbar.js

export default function Navbar()
{
    return ( 
        <nav className="nav">
            <Link to="/" className="site-title">Spoti Sync</Link>
            <ul>
                
                    <CustomLink to="/Dashboard">Dashboard</CustomLink>
                    <CustomLink to="/Search">Search</CustomLink>
                    <CustomLink to="/About">About</CustomLink>
                    <CustomLink to="/CurrentUser">Logged in as</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({to, children, ...props}) 
{
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}