import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X, Briefcase } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                localStorage.removeItem("token");
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to logout");
        }
    };

    const linkClasses = ({ isActive }) =>
        `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            isActive 
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
        }`;

    return (
        <header className='glass-nav sticky top-0 z-50 transition-colors'>
            <div className='w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-16 flex items-center justify-between'>
                {/* Logo */}
                <Link to="/" className='flex items-center gap-2.5 group'>
                    <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform'>
                        <Briefcase className='w-5 h-5' />
                    </div>
                    <span className='text-xl font-bold tracking-tight text-slate-900 dark:text-white'>
                        Job<span className='text-indigo-600 dark:text-indigo-400'>Portal</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex items-center gap-6'>
                    <ul className='flex items-center gap-1.5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><NavLink to="/admin/companies" className={linkClasses}>Companies</NavLink></li>
                                <li><NavLink to="/admin/jobs" className={linkClasses}>Jobs</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/" className={linkClasses}>Home</NavLink></li>
                                <li><NavLink to="/jobs" className={linkClasses}>Jobs</NavLink></li>
                                <li><NavLink to="/browse" className={linkClasses}>Browse</NavLink></li>
                            </>
                        )}
                    </ul>

                    {/* Divider */}
                    <div className='h-5 w-px bg-slate-200 dark:bg-slate-800'></div>

                    {/* Theme Toggle Button */}
                    <ThemeToggle />

                    {/* Auth Actions / User Avatar */}
                    {!user ? (
                        <div className='flex items-center gap-2.5'>
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className='rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm" className='rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'>
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className='rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900'>
                                    <Avatar className="cursor-pointer border border-slate-200 dark:border-slate-700 w-9 h-9">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" align="end">
                                <div className='flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800'>
                                    <Avatar className="w-11 h-11 border border-slate-200 dark:border-slate-700">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                    <div className='min-w-0'>
                                        <h4 className='font-bold text-sm text-slate-900 dark:text-white truncate'>{user?.fullname}</h4>
                                        <p className='text-xs text-slate-500 dark:text-slate-400 capitalize'>{user?.role}</p>
                                    </div>
                                </div>
                                <div className='pt-3 space-y-1'>
                                    {user && user.role === 'student' && (
                                        <Link 
                                            to="/profile" 
                                            className='flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors font-medium'
                                        >
                                            <User2 className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                            <span>View Profile</span>
                                        </Link>
                                    )}
                                    <button 
                                        onClick={logoutHandler}
                                        className='w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors font-medium text-left'
                                    >
                                        <LogOut className='w-4 h-4 text-rose-500' />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </nav>

                {/* Mobile Menu & Theme Button */}
                <div className='flex items-center gap-2 md:hidden'>
                    <ThemeToggle />
                    {user && (
                        <Link to={user.role === 'student' ? "/profile" : "/admin/companies"}>
                            <Avatar className="w-8 h-8 border border-slate-200 dark:border-slate-700">
                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                            </Avatar>
                        </Link>
                    )}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        aria-label="Toggle Navigation Menu"
                    >
                        {mobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            {mobileMenuOpen && (
                <div className='md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 shadow-lg'>
                    <ul className='space-y-1'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link 
                                        to="/admin/companies" 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg'
                                    >
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/jobs" 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg'
                                    >
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link 
                                        to="/" 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg'
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/jobs" 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg'
                                    >
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/browse" 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='block px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg'
                                    >
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className='pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2'>
                        {!user ? (
                            <>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className='w-full rounded-xl dark:border-slate-800'>Login</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className='w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white'>Sign Up</Button>
                                </Link>
                            </>
                        ) : (
                            <Button 
                                variant="outline" 
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    logoutHandler();
                                }} 
                                className='w-full rounded-xl text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                            >
                                <LogOut className='w-4 h-4 mr-2' /> Logout
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;