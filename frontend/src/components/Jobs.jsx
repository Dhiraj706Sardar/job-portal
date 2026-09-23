import { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';

const JOBS_PER_PAGE = 12;

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchedQuery) {
            const query = searchedQuery.toLowerCase().trim();
            const filtered = (allJobs || []).filter((job) => {
                const titleMatch = job?.title?.toLowerCase().includes(query);
                const descMatch = job?.description?.toLowerCase().includes(query);
                const locMatch = job?.location?.toLowerCase().includes(query);
                const typeMatch = job?.jobType?.toLowerCase().includes(query);
                const companyMatch = job?.company?.name?.toLowerCase().includes(query);
                const reqMatch = Array.isArray(job?.requirements) && job.requirements.some(r => r.toLowerCase().includes(query));

                return titleMatch || descMatch || locMatch || typeMatch || companyMatch || reqMatch;
            });
            setFilterJobs(filtered);
        } else {
            setFilterJobs(allJobs || []);
        }
        setCurrentPage(1);
    }, [allJobs, searchedQuery]);

    // Pagination calculations
    const totalJobs = filterJobs.length;
    const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    const currentJobs = filterJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors'>
            <Navbar />
            <div className='w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 flex-1'>
                {/* Header Stats */}
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>Browse Available Jobs</h1>
                        <p className='text-sm text-slate-500 dark:text-slate-400 mt-0.5'>
                            Showing {totalJobs} {totalJobs === 1 ? 'position' : 'positions'}
                            {searchedQuery && <span> matching &ldquo;<strong className='text-indigo-600 dark:text-indigo-400'>{searchedQuery}</strong>&rdquo;</span>}
                        </p>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-6 items-start'>
                    {/* Filter Sidebar */}
                    <div className='w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-20'>
                        <FilterCard />
                    </div>

                    {/* Jobs Grid / Empty State */}
                    <div className='flex-1 w-full'>
                        {filterJobs.length === 0 ? (
                            <div className='bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center shadow-sm flex flex-col items-center justify-center my-6'>
                                <div className='w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4'>
                                    <SearchX className='w-8 h-8' />
                                </div>
                                <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-1'>No Jobs Found</h3>
                                <p className='text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6'>
                                    We couldn&apos;t find any jobs matching your current filter. Try searching with different keywords or clear your active filters.
                                </p>
                                <Button 
                                    onClick={() => dispatch(setSearchedQuery(''))}
                                    className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2'
                                >
                                    <RotateCcw className='w-4 h-4' /> Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <div className='space-y-6'>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
                                    <AnimatePresence>
                                        {currentJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                key={job?._id}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className='flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm'>
                                        <p className='text-xs text-slate-500 dark:text-slate-400'>
                                            Page <strong className='text-slate-800 dark:text-slate-200'>{currentPage}</strong> of <strong className='text-slate-800 dark:text-slate-200'>{totalPages}</strong>
                                        </p>
                                        <div className='flex items-center gap-2'>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                className='rounded-lg text-xs font-semibold dark:border-slate-800 dark:hover:bg-slate-800'
                                            >
                                                <ChevronLeft className='w-4 h-4 mr-1' /> Previous
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === totalPages}
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                className='rounded-lg text-xs font-semibold dark:border-slate-800 dark:hover:bg-slate-800'
                                            >
                                                Next <ChevronRight className='w-4 h-4 ml-1' />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;