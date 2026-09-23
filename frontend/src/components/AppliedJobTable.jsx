import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Briefcase, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase();
        if (s === 'rejected') {
            return (
                <Badge variant="outline" className='bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900 font-semibold px-2.5 py-0.5'>
                    Rejected
                </Badge>
            );
        }
        if (s === 'pending') {
            return (
                <Badge variant="outline" className='bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900 font-semibold px-2.5 py-0.5'>
                    Pending
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className='bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900 font-semibold px-2.5 py-0.5'>
                Accepted
            </Badge>
        );
    };

    if (!allAppliedJobs || allAppliedJobs.length === 0) {
        return (
            <div className='text-center py-12 px-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl'>
                <div className='w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400'>
                    <Briefcase className='w-6 h-6' />
                </div>
                <h3 className='text-base font-semibold text-slate-800 dark:text-slate-200 mb-1'>No Applications Yet</h3>
                <p className='text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4'>
                    You haven&apos;t applied to any jobs yet. Start exploring thousands of open opportunities today!
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
                    A list of your recent job applications
                </TableCaption>
                <TableHeader>
                    <TableRow className='border-b border-slate-200 dark:border-slate-800 hover:bg-transparent'>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Applied Date</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Role</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Company</TableHead>
                        <TableHead className="text-right text-slate-700 dark:text-slate-300 font-semibold">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id} className='border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors'>
                            <TableCell className='text-slate-600 dark:text-slate-400 font-medium text-sm'>
                                {appliedJob?.createdAt ? new Date(appliedJob.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently'}
                            </TableCell>
                            <TableCell className='font-semibold text-slate-900 dark:text-slate-100'>
                                {appliedJob.job?.title || 'Unknown Role'}
                            </TableCell>
                            <TableCell className='text-slate-600 dark:text-slate-300'>
                                {appliedJob.job?.company?.name || 'Company'}
                            </TableCell>
                            <TableCell className="text-right">
                                {getStatusBadge(appliedJob.status)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;