import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bookmark, ArrowUpRight, Trash2, MapPin, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useBookmarks from '@/hooks/useBookmarks';

const SavedJobTable = () => {
    const { bookmarks = [], toggleBookmark } = useBookmarks();

    if (!bookmarks || bookmarks.length === 0) {
        return (
            <div className='text-center py-12 px-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl'>
                <div className='w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center mx-auto mb-3 text-indigo-500'>
                    <Bookmark className='w-6 h-6' />
                </div>
                <h3 className='text-base font-semibold text-slate-800 dark:text-slate-200 mb-1'>No Bookmarked Jobs Yet</h3>
                <p className='text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4'>
                    You haven&apos;t saved any jobs yet. Browse available jobs and click the bookmark button to save them for later!
                </p>
                <Link 
                    to="/jobs" 
                    className='inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all'
                >
                    Explore Jobs <ArrowUpRight className='w-4 h-4' />
                </Link>
            </div>
        );
    }

    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableCaption className='text-slate-400 dark:text-slate-500 text-xs mt-4'>
                    A list of jobs you have saved for later
                </TableCaption>
                <TableHeader>
                    <TableRow className='border-b border-slate-200 dark:border-slate-800 hover:bg-transparent'>
                        <TableHead className='font-semibold text-slate-700 dark:text-slate-300'>Company</TableHead>
                        <TableHead className='font-semibold text-slate-700 dark:text-slate-300'>Job Title</TableHead>
                        <TableHead className='font-semibold text-slate-700 dark:text-slate-300'>Location</TableHead>
                        <TableHead className='font-semibold text-slate-700 dark:text-slate-300'>Salary</TableHead>
                        <TableHead className='font-semibold text-slate-700 dark:text-slate-300'>Type</TableHead>
                        <TableHead className='text-right font-semibold text-slate-700 dark:text-slate-300'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookmarks.map((job) => {
                        const jobId = job?._id;
                        const companyName = job?.company?.name || 'Company';
                        const companyLogo = job?.company?.logo;

                        return (
                            <TableRow key={jobId} className='border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors'>
                                <TableCell className='py-3.5 font-medium text-slate-900 dark:text-slate-100'>
                                    <div className='flex items-center gap-2.5'>
                                        {companyLogo ? (
                                            <img src={companyLogo} alt={companyName} className='w-7 h-7 rounded-lg object-cover border border-slate-200 dark:border-slate-700' />
                                        ) : (
                                            <div className='w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500'>
                                                <Building2 className='w-4 h-4' />
                                            </div>
                                        )}
                                        <span className='truncate max-w-[140px]'>{companyName}</span>
                                    </div>
                                </TableCell>
                                <TableCell className='py-3.5 font-semibold text-slate-800 dark:text-slate-200'>
                                    <Link to={`/description/${jobId}`} className='hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1'>
                                        {job?.title || 'Job Title'}
                                    </Link>
                                </TableCell>
                                <TableCell className='py-3.5 text-slate-600 dark:text-slate-400 text-xs'>
                                    <span className='inline-flex items-center gap-1'>
                                        <MapPin className='w-3 h-3 text-slate-400' />
                                        {job?.location || 'Remote'}
                                    </span>
                                </TableCell>
                                <TableCell className='py-3.5 text-xs font-medium text-purple-600 dark:text-purple-400'>
                                    {job?.salary ? `${job.salary} LPA` : 'Competitive'}
                                </TableCell>
                                <TableCell className='py-3.5'>
                                    <Badge variant="secondary" className='text-xs font-normal bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'>
                                        {job?.jobType || 'Full Time'}
                                    </Badge>
                                </TableCell>
                                <TableCell className='py-3.5 text-right'>
                                    <div className='flex items-center justify-end gap-2'>
                                        <Link to={`/description/${jobId}`}>
                                            <Button size="sm" variant="outline" className='h-8 px-2.5 rounded-lg text-xs font-medium text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50'>
                                                View <ArrowUpRight className='w-3.5 h-3.5 ml-1' />
                                            </Button>
                                        </Link>
                                        <Button 
                                            size="sm" 
                                            variant="ghost" 
                                            onClick={(e) => toggleBookmark(job, e)}
                                            className='h-8 w-8 p-0 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                                            title="Remove bookmark"
                                        >
                                            <Trash2 className='w-4 h-4' />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default SavedJobTable;
