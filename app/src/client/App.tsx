import './Main.css';
import NavBar from './components/NavBar/NavBar';
import SideNavbar from './components/SideNavbar/SideNavbar';
import CookieConsentBanner from './components/cookie-consent/Banner';
import { useMemo, useEffect } from 'react';
import { routes } from 'wasp/client/router';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import { useIsLandingPage } from './hooks/useIsLandingPage';
import { updateCurrentUserLastActiveTimestamp } from 'wasp/client/operations';
import { cn } from './cn';

/**
 * use this component to wrap all child components
 * this is useful for templates, themes, and context
 */
export default function App() {
  const location = useLocation();
  const { data: user } = useAuth();
  const isLandingPage = useIsLandingPage();
  const navigationItems = [];

  const shouldDisplayAppNavBar = useMemo(() => {
    return location.pathname !== routes.LoginRoute.build() && location.pathname !== routes.SignupRoute.build();
  }, [location]);

  const isAdminDashboard = useMemo(() => {
    return location.pathname.startsWith('/admin');
  }, [location]);

  const shouldDisplaySideNav = useMemo(() => {
    return user && !isLandingPage && !isAdminDashboard;
  }, [user, isLandingPage, isAdminDashboard]);

  useEffect(() => {
    if (user) {
      const lastSeenAt = new Date(user.lastActiveTimestamp);
      const today = new Date();
      if (today.getTime() - lastSeenAt.getTime() > 5 * 60 * 1000) {
        updateCurrentUserLastActiveTimestamp({ lastActiveTimestamp: today });
      }
    }
  }, [user]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [location]);

  return (
    <div className='min-h-screen bg-white dark:bg-boxdark-2'>
      {shouldDisplayAppNavBar && <NavBar navigationItems={navigationItems} />}
      {shouldDisplaySideNav && <SideNavbar />}
      <div
        className={cn(
          isAdminDashboard ? '' : 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          {
            'pl-64': shouldDisplaySideNav && !isAdminDashboard,
          }
        )}
      >
        <Outlet />
      </div>
      <CookieConsentBanner />
    </div>
  );
}
