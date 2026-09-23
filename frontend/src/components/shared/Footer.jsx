import { Briefcase, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
            <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand & Mission */}
                    <div className="md:col-span-1 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Job<span className="text-indigo-600 dark:text-indigo-400">Portal</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            The modern career platform connecting top software engineers, designers, and innovators with high-growth technology companies worldwide.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>All hiring systems operational</span>
                        </div>
                    </div>

                    {/* Candidates Column */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                            For Candidates
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/jobs" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Browse Tech Jobs</Link></li>
                            <li><Link to="/browse" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Search by Skill</Link></li>
                            <li><Link to="/jobs" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Remote Opportunities</Link></li>
                            <li><Link to="/profile" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Candidate Profile</Link></li>
                        </ul>
                    </div>

                    {/* Employers Column */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                            For Employers
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/admin/jobs/create" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Post an Opening</Link></li>
                            <li><Link to="/admin/companies" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Company Dashboard</Link></li>
                            <li><Link to="/admin/jobs" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Manage Job Listings</Link></li>
                            <li><Link to="/signup" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Recruiter Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* Social & Connect */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                            Connect & Resources
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Stay up-to-date with developer hiring trends and tech career insights.
                        </p>
                        <div className="flex items-center gap-3">
                            <a 
                                href="https://github.com" 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
                    <p>© {new Date().getFullYear()} JobPortal Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">Terms of Service</span>
                        <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">Security</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;