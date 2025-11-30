import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">SpanCards</h1>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/stats" className="nav-link">Stats</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;

