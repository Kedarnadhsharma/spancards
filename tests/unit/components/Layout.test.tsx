import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../../../src/components/Layout';

function renderLayout(children = <div>Test Content</div>) {
  return render(
    <BrowserRouter>
      <Layout>{children}</Layout>
    </BrowserRouter>
  );
}

describe('Layout', () => {
  it('renders app title', () => {
    renderLayout();
    expect(screen.getByText('SpanCards')).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    renderLayout();
    
    const homeLink = screen.getByRole('link', { name: /go to home page/i });
    const statsLink = screen.getByRole('link', { name: /view statistics/i });
    const settingsLink = screen.getByRole('link', { name: /open settings/i });
    
    expect(homeLink).toBeInTheDocument();
    expect(statsLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });

  it('home link has correct href', () => {
    renderLayout();
    
    const homeLink = screen.getByRole('link', { name: /go to home page/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('stats link has correct href', () => {
    renderLayout();
    
    const statsLink = screen.getByRole('link', { name: /view statistics/i });
    expect(statsLink).toHaveAttribute('href', '/stats');
  });

  it('renders children in main content area', () => {
    renderLayout(<div>Custom Test Content</div>);
    expect(screen.getByText('Custom Test Content')).toBeInTheDocument();
  });

  it('has header element', () => {
    renderLayout();
    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('has main element', () => {
    renderLayout();
    const main = document.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('header contains navigation', () => {
    renderLayout();
    const header = document.querySelector('header');
    const nav = header?.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });
});

