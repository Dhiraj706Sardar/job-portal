import { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, SearchX, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [searchText, setSearchText] = useState(searchedQuery || "");
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchedQuery(searchText));
    };

    const handleClear = () => {
        setSearchText("");
        dispatch(setSearchedQuery(""));
    };

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors'>
            <Navbar />
            <div className='w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 flex-1'>
                {/* Search Bar Header */}
                <div className='bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8 transition-colors'>
                    <form onSubmit={handleSearch} className='flex flex-col sm:flex-row items-center gap-3'>
                        <div className='relative flex-1 w-full'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500' />
                            <Input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search by role, company, location, or tech skills..."
                                className='pl-10 h-11 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500'
                            />
                        </div>
                        <div className='flex items-center gap-2 w-full sm:w-auto'>
                            <Button 
                                type="submit" 
                                className='h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex-1 sm:flex-initial shadow-md shadow-indigo-500/20'
                            >
                                Search
                            </Button>
                            {searchedQuery && (
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={handleClear} 
                                    className='h-11 px-4 rounded-xl text-slate-600 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800 flex items-center gap-1.5'
                                >
                                    <RotateCcw className='w-4 h-4' /> Clear
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Results Header */}
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>Search Results</h1>
                        <p className='text-sm text-slate-500 dark:text-slate-400 mt-0.5'>
                            Found {allJobs?.length || 0} {allJobs?.length === 1 ? 'opening' : 'openings'}
                            {searchedQuery && <span> matching &ldquo;<strong className='text-indigo-600 dark:text-indigo-400'>{searchedQuery}</strong>&rdquo;</span>}
                        </p>
                    </div>
                </div>

                {/* Jobs Grid or Empty State */}
                {!allJobs || allJobs.length === 0 ? (
                    <div className='bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center shadow-sm flex flex-col items-center justify-center my-6'>
                        <div className='w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4'>
                            <SearchX className='w-8 h-8' />
                        </div>
                        <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-1'>No Jobs Found</h3>
                        <p className='text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6'>
                            We couldn&apos;t find any opportunities matching your search term. Try exploring popular tags or resetting the search.
                        </p>
                        {searchedQuery && (
                            <Button 
                                onClick={handleClear}
                                className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold'
                            >
                                View All Jobs
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;