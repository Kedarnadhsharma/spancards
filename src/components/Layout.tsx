import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <header className="header" role="banner">
        <div className="header-content">
          <h1 className="app-title">
            <Link to="/" aria-label="SpanCards Home" style={{ color: 'inherit', textDecoration: 'none' }}>
              SpanCards
            </Link>
          </h1>
          <nav className="nav" role="navigation" aria-label="Main navigation">
            <Link to="/" className="nav-link" aria-label="Go to home page">Home</Link>
            <Link to="/stats" className="nav-link" aria-label="View statistics">Stats</Link>
            <Link to="/settings" className="nav-link" aria-label="Open settings">Settings</Link>
          </nav>
        </div>
      </header>
      <main className="main-content" role="main" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

export default Layout;

