import { useState } from 'react';
import { Button } from './ui/button';
import { Search, Sparkles, Building, Briefcase, Zap, ShieldCheck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const POPULAR_TAGS = ["React", "Node.js", "Full Stack", "Remote", "DevOps", "Python", "MERN"];

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (e) => {
        if (e) e.preventDefault();
        if (query.trim()) {
            dispatch(setSearchedQuery(query.trim()));
            navigate("/browse");
        }
    };

    const handleTagClick = (tag) => {
        dispatch(setSearchedQuery(tag));
        navigate("/browse");
    };

    return (
        <section className='relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 transition-colors'>
            {/* Ambient background glow effects */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1720px] h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-600/15 dark:via-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10' />
            <div className='absolute -top-24 right-1/4 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-2xl pointer-events-none -z-10' />

            <div className='w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 text-center'>
                <div className='flex flex-col items-center gap-6 max-w-4xl mx-auto'>
                    {/* Live Ticker Pill */}
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-2xs backdrop-blur-md'>
                        <Sparkles className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                        <span>Over 100+ Live Tech Roles Added This Week</span>
                    </div>

                    {/* Headline */}
                    <h1 className='text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]'>
                        Discover, Apply & Land <br />
                        Your <span className='gradient-text'>Dream Tech Career</span>
                    </h1>

                    {/* Subtitle */}
                    <p className='text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed'>
                        Join thousands of developers finding high-impact engineering roles at top tech companies, startups, and remote-first teams worldwide.
                    </p>

                    {/* Omni Search Bar */}
                    <form 
                        onSubmit={searchJobHandler}
                        className='w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 dark:shadow-black/40 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-full p-2 flex flex-col sm:flex-row items-center gap-2 mt-2 transition-colors'
                    >
                        <div className='flex items-center gap-3 w-full px-3.5 flex-1'>
                            <Search className='h-5 w-5 text-slate-400 dark:text-slate-500 flex-shrink-0' />
                            <input
                                type="text"
                                value={query}
                                placeholder="Search by role, company, skill (e.g. React, Node.js), or location..."
                                onChange={(e) => setQuery(e.target.value)}
                                className='outline-none border-none w-full text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent py-2.5'
                            />
                        </div>
                        <Button 
                            type="submit" 
                            size="lg"
                            className="rounded-xl sm:rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 w-full sm:w-auto h-11 sm:h-12 shadow-md shadow-indigo-500/25"
                        >
                            Search Jobs
                        </Button>
                    </form>

                    {/* Trending Search Chips */}
                    <div className='flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400'>
                        <span className='font-medium text-slate-400 dark:text-slate-500'>Popular:</span>
                        {POPULAR_TAGS.map((tag, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleTagClick(tag)}
                                className='px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-2xs font-medium'
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Live Metric Badges */}
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mt-8 pt-8 border-t border-slate-200/60 dark:border-slate-800/60'>
                        <div className='flex flex-col items-center p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50'>
                            <div className='w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1.5'>
                                <Briefcase className='w-4 h-4' />
                            </div>
                            <span className='text-xl font-bold text-slate-900 dark:text-white'>100+</span>
                            <span className='text-xs text-slate-500 dark:text-slate-400'>Active Jobs</span>
                        </div>
                        <div className='flex flex-col items-center p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50'>
                            <div className='w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-1.5'>
                                <Building className='w-4 h-4' />
                            </div>
                            <span className='text-xl font-bold text-slate-900 dark:text-white'>100+</span>
                            <span className='text-xs text-slate-500 dark:text-slate-400'>Top Companies</span>
                        </div>
                        <div className='flex flex-col items-center p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50'>
                            <div className='w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5'>
                                <Zap className='w-4 h-4' />
                            </div>
                            <span className='text-xl font-bold text-slate-900 dark:text-white'>&lt; 24h</span>
                            <span className='text-xs text-slate-500 dark:text-slate-400'>Fast Feedback</span>
                        </div>
                        <div className='flex flex-col items-center p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50'>
                            <div className='w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-1.5'>
                                <ShieldCheck className='w-4 h-4' />
                            </div>
                            <span className='text-xl font-bold text-slate-900 dark:text-white'>100%</span>
                            <span className='text-xs text-slate-500 dark:text-slate-400'>Verified Roles</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;