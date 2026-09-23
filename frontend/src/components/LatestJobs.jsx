import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className='w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 my-16'>
            <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8'>
                <div>
                    <div className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2'>
                        <Sparkles className='w-3.5 h-3.5' /> Fresh Tech Roles
                    </div>
                    <h2 className='text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
                        Featured <span className='text-indigo-600 dark:text-indigo-400'>Job Openings</span>
                    </h2>
                </div>
                <Link to="/jobs">
                    <Button 
                        variant="outline" 
                        className='rounded-xl font-semibold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2'
                    >
                        Explore All Jobs <ArrowRight className='w-4 h-4' />
                    </Button>
                </Link>
            </div>

            {!allJobs || allJobs.length === 0 ? (
                <div className='bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400'>
                    No job openings currently available. Check back soon!
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {allJobs.slice(0, 8).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default LatestJobs;