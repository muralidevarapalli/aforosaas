import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import { cn } from '../../cn';

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-boxdark transition-all duration-300 ease-in-out z-40 shadow-lg',
        {
          'w-64': !isCollapsed,
          'w-20': isCollapsed,
        }
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-white dark:bg-boxdark rounded-full p-1 shadow-md"
      >
        <IoIosArrowBack
          className={cn('h-5 w-5 text-gray-600 dark:text-white transition-transform duration-300', {
            'rotate-180': isCollapsed,
          })}
        />
      </button>

      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
          <span className={cn('text-xl font-bold dark:text-white', { hidden: isCollapsed })}>Aforo.ai</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 pt-6">
          <ul className="space-y-2 px-4">
            <li>
              <Link
                to="/products"
                className={cn(
                  'flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg transition-colors group',
                  {
                    'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-white': isActive('/products'),
                    'hover:bg-gray-100 dark:hover:bg-gray-700': !isActive('/products'),
                  }
                )}
              >
                <HiOutlineShoppingBag className={cn('h-6 w-6', {
                  'text-blue-600 dark:text-white': isActive('/products'),
                })} />
                <span
                  className={cn('ml-3 font-medium transition-opacity duration-300', {
                    'opacity-0 hidden': isCollapsed,
                    'opacity-100': !isCollapsed,
                  })}
                >
                  Products
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
