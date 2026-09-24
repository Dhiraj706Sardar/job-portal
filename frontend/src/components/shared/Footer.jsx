import { useState } from 'react';
import { Briefcase, Github, Twitter, Linkedin, Sparkles, Building2, UserCircle2, ArrowRight, UserCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import LegalDialog from './LegalDialog';

const QUICK_STACKS = ["React", "Node.js", "Full Stack", "Remote", "Python", "MERN"];

const Footer = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [legalOpen, setLegalOpen] = useState(false);
    const [legalTab, setLegalTab] = useState('privacy');

    const openLegal = (tab) => {
        setLegalTab(tab);
        setLegalOpen(true);
    };

    const handleQuickSearch = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isStudent = user?.role === 'student';
    const isRecruiter = user?.role === 'recruiter';
    const isGuest = !user;

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer Navigation</h2>

            <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
                
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="inline-flex items-center gap-2.5 group">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Job<span className="text-indigo-600 dark:text-indigo-400">Portal</span>
                            </span>
                        </Link>

                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                            The intelligent engineering career platform connecting high-caliber developers, designers, and tech innovators with premier technology companies worldwide.
                        </p>

                        
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>All Platform Services Operational</span>
                        </div>

                        
                        <div className="pt-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                                Engineered With Modern Architecture
                            </span>
                            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">React 18</span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">Redux Toolkit</span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">Node / Express</span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">MongoDB</span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">Tailwind CSS</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-1.5 mb-4">
                            <UserCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                {isStudent ? 'Job Discovery' : isRecruiter ? 'Talent Discovery' : 'For Jobseekers'}
                            </h3>
                        </div>

                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/jobs" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Browse All Openings
                                </Link>
                            </li>
                            <li>
                                <Link to="/browse" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Search by Tech Stack
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleQuickSearch("Remote")}
                                    className="text-left text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                    Remote Opportunities
                                </button>
                            </li>

                            {isStudent && (
                                <li>
                                    <button
                                        onClick={() => handleQuickSearch("Full Stack")}
                                        className="text-left text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        Full Stack Positions
                                    </button>
                                </li>
                            )}

                            {isGuest && (
                                <>
                                    <li>
                                        <Link to="/login?role=student" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                                            Candidate Sign In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup?role=student" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            Create Free Profile
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div>
                        {isStudent && (
                            <>
                                <div className="flex items-center gap-1.5 mb-4">
                                    <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                        My Career Portal
                                    </h3>
                                </div>
                                <ul className="space-y-2.5 text-sm">
                                    <li>
                                        <Link to="/profile" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
                                            <span>My Profile & Resume</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/profile" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            Tracked Applications
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/profile" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            Skills & Bio Setup
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            Explore Saved Skills
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )}

                        {isRecruiter && (
                            <>
                                <div className="flex items-center gap-1.5 mb-4">
                                    <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                        Recruiter Hub
                                    </h3>
                                </div>
                                <ul className="space-y-2.5 text-sm">
                                    <li>
                                        <Link to="/admin/jobs/create" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                                            <span>Post New Opening</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            Manage Job Postings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/companies" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            Company Profiles
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/companies/create" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            Register New Company
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )}

                        {isGuest && (
                            <>
                                <div className="flex items-center gap-1.5 mb-4">
                                    <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                        For Employers
                                    </h3>
                                </div>
                                <ul className="space-y-2.5 text-sm">
                                    <li>
                                        <Link to="/signup?role=recruiter" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                                            <span>Post a Tech Opening</span>
                                            <Sparkles className="w-3.5 h-3.5" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/login?role=recruiter" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            Recruiter Sign In
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => openLegal('employer-info')}
                                            className="text-left text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            Hiring Solutions & FAQ
                                        </button>
                                    </li>
                                    <li>
                                        <Link to="/signup?role=recruiter" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            Create Employer Account
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>


                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                            Popular Categories
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mb-6">
                            {QUICK_STACKS.map((stack) => (
                                <button
                                    key={stack}
                                    onClick={() => handleQuickSearch(stack)}
                                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700/80 transition-colors"
                                >
                                    {stack}
                                </button>
                            ))}
                        </div>

                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                            Connect & Community
                        </h4>
                        <div className="flex items-center gap-2.5">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                aria-label="JobPortal on GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                aria-label="JobPortal on Twitter"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                aria-label="JobPortal on LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200/80 dark:border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p>© {new Date().getFullYear()} JobPortal Inc. All rights reserved.</p>
                        {user && (
                            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                                {isStudent ? 'Candidate Account' : 'Employer Account'}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            type="button"
                            onClick={() => openLegal('privacy')}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                        >
                            Privacy Policy
                        </button>
                        <button
                            type="button"
                            onClick={() => openLegal('terms')}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                        >
                            Terms of Service
                        </button>
                        <button
                            type="button"
                            onClick={() => openLegal('security')}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                        >
                            Security & Trust
                        </button>
                    </div>
                </div>
            </div>

            <LegalDialog
                isOpen={legalOpen}
                onClose={() => setLegalOpen(false)}
                initialTab={legalTab}
            />
        </footer>
    );
};

export default Footer;