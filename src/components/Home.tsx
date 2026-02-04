import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isJobsActive = location.pathname === '/' || location.pathname === '/jobs';
  const isRecruiterActive = location.pathname === '/recruiter';

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b border-border bg-card'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary'>
              <span className='text-sm font-bold text-primary-foreground'>HL</span>
            </div>
            <h1 className='text-2xl font-bold text-foreground'>HireLink</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex gap-2'>
            <Button variant={isJobsActive ? 'default' : 'outline'} onClick={() => navigate('/jobs')} className='px-6'>
              Job Listings
            </Button>
            <Button
              variant={isRecruiterActive ? 'default' : 'outline'}
              onClick={() => navigate('/recruiter')}
              className='px-6'
            >
              Recruiter Dashboard
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer hover:text-white'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle mobile menu'
          >
            {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-border bg-card'>
            <nav className='px-4 py-4 space-y-2'>
              <Button
                variant={isJobsActive ? 'default' : 'outline'}
                onClick={() => handleNavigation('/jobs')}
                className='w-full justify-start'
              >
                Job Listings
              </Button>
              <Button
                variant={isRecruiterActive ? 'default' : 'outline'}
                onClick={() => handleNavigation('/recruiter')}
                className='w-full justify-start'
              >
                Recruiter Dashboard
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
