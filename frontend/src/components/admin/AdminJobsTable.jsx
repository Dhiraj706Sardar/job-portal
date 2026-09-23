import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableCaption className='text-xs text-slate-400 dark:text-slate-500 mt-4'>
                    A list of your posted jobs
                </TableCaption>
                <TableHeader>
                    <TableRow className='border-b border-slate-200 dark:border-slate-800 hover:bg-transparent'>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Company Name</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Role</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Date Posted</TableHead>
                        <TableHead className="text-right text-slate-700 dark:text-slate-300 font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!filterJobs || filterJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-slate-500 dark:text-slate-400">
                                No posted jobs found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map((job) => (
                            <TableRow key={job._id} className='border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors'>
                                <TableCell className='font-semibold text-slate-900 dark:text-slate-100'>
                                    {job?.company?.name || 'N/A'}
                                </TableCell>
                                <TableCell className='text-slate-700 dark:text-slate-300 font-medium'>
                                    {job?.title}
                                </TableCell>
                                <TableCell className='text-slate-600 dark:text-slate-400 text-sm'>
                                    {job?.createdAt ? new Date(job.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors'>
                                            <MoreHorizontal className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-xl">
                                            <button 
                                                onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                className='w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                            >
                                                <Edit2 className='w-3.5 h-3.5 text-indigo-500' />
                                                <span>Edit</span>
                                            </button>
                                            <button 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className='w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-1'
                                            >
                                                <Eye className='w-3.5 h-3.5 text-emerald-500' />
                                                <span>Applicants</span>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable