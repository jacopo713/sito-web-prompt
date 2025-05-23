// src/components/Navbar.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image'; // IMPORTA Image da next/image
import { usePathname, useRouter } from 'next/navigation';
import { FaBrain, FaComments, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { FiBookOpen, FiGrid, FiMenu, FiUserCheck, FiUser, FiLoader } from 'react-icons/fi'; // Aggiunto FiLoader
import { useAuth } from '@/context/AuthContext';
import { auth, signOut } from '@/lib/firebase/clientApp';

const navLinks = [
  { href: "/corsi", label: "Corsi", icon: FiBookOpen },
  { href: "/prompts", label: "Libreria Prompt", icon: FiGrid },
  { href: "/ai-chat", label: "AI Chat", icon: FaComments },
  { href: "/live-coach", label: "Live Coach", icon: FiUserCheck },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center group" aria-label="Pagina principale di Fagyl">
            <FaBrain className="h-8 w-8 mr-2.5 text-sky-400 group-hover:text-sky-300 transition-colors duration-300 ease-in-out transform group-hover:scale-105" />
            <span className="text-2xl sm:text-3xl font-bold text-slate-100 group-hover:text-sky-300 transition-colors duration-300 ease-in-out">
              Fagyl
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out flex items-center group
                    ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-md transform scale-105'
                        : 'text-slate-300 hover:bg-slate-700/80 hover:text-white hover:shadow-sm'
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-400`}
                >
                  {LinkIcon && <LinkIcon className={`mr-2 h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-300 transition-colors duration-300'}`} />}
                  {link.label}
                </Link>
              );
            })}

            {loading ? (
              <div className="ml-3 lg:ml-4 flex items-center justify-center h-8 w-24 bg-slate-700 rounded-md animate-pulse">
                <FiLoader className="animate-spin h-5 w-5 text-slate-400" />
              </div>
            ) : user ? (
              <div className="ml-3 lg:ml-4 flex items-center">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="User Avatar"
                    width={32} // 32px per h-8 w-8
                    height={32}
                    className="rounded-full mr-2 border-2 border-sky-400 object-cover"
                  />
                ) : (
                  <FiUser className="h-7 w-7 mr-2 text-slate-300 border-2 border-slate-500 rounded-full p-1"/>
                )}
                <span className="text-sm text-slate-300 hidden lg:inline mr-3">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out shadow-sm flex items-center group bg-red-600 hover:bg-red-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-400`}
                >
                  <FaSignOutAlt className="mr-2 h-4 w-4 text-red-200 group-hover:text-white transition-colors duration-300" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                aria-current={pathname.startsWith('/login') ? 'page' : undefined}
                className={`ml-3 lg:ml-4 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out shadow-sm flex items-center group
                  ${
                    pathname.startsWith('/login')
                      ? 'bg-indigo-500 text-white ring-2 ring-indigo-300 ring-offset-1 ring-offset-slate-900 transform scale-105'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white focus:bg-indigo-500'
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-400`}
              >
                <FaSignInAlt className="mr-2 h-4 w-4 text-indigo-200 group-hover:text-white transition-colors duration-300" />
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              aria-label="Apri menu principale"
              aria-expanded={false}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
