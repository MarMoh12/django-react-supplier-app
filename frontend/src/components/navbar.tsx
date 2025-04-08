import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const location = useLocation();

  // Aktiver Link wird basierend auf dem aktuellen Pfad hervorgehoben
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Supplier Dashboard</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/suppliers')}`} to="/suppliers">
                Supplier
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/evaluations')}`} to="/evaluations">
                Evaluations
              </Link>
            </li>
          </ul>
          <button className="btn btn-outline-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
