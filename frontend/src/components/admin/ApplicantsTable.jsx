import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    }

    const applications = applicants?.applications || [];

    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableCaption className='text-xs text-slate-400 dark:text-slate-500 mt-4'>
                    A list of applicants who applied for this role
                </TableCaption>
                <TableHeader>
                    <TableRow className='border-b border-slate-200 dark:border-slate-800 hover:bg-transparent'>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Candidate Name</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Email</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Contact</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Resume</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Applied Date</TableHead>
                        <TableHead className="text-right text-slate-700 dark:text-slate-300 font-semibold">Decision</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-slate-500 dark:text-slate-400">
                                No applications received for this job posting yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        applications.map((item) => (
                            <TableRow key={item._id} className='border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors'>
                                <TableCell className='font-semibold text-slate-900 dark:text-slate-100'>
                                    {item?.applicant?.fullname || 'Applicant'}
                                </TableCell>
                                <TableCell className='text-slate-600 dark:text-slate-400 text-sm'>
                                    {item?.applicant?.email}
                                </TableCell>
                                <TableCell className='text-slate-600 dark:text-slate-400 text-sm'>
                                    {item?.applicant?.phoneNumber || 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {item.applicant?.profile?.resume ? (
                                        <a 
                                            className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold text-xs sm:text-sm hover:underline"
                                            href={item?.applicant?.profile?.resume} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <FileText className='w-3.5 h-3.5' />
                                            <span>{item?.applicant?.profile?.resumeOriginalName || "Resume"}</span>
                                        </a>
                                    ) : (
                                        <span className='text-slate-400 text-xs'>Not Provided</span>
                                    )}
                                </TableCell>
                                <TableCell className='text-slate-600 dark:text-slate-400 text-sm'>
                                    {item?.applicant?.createdAt ? new Date(item.applicant.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors'>
                                            <MoreHorizontal className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-xl">
                                            {shortlistingStatus.map((status, index) => {
                                                const isAccept = status === "Accepted";
                                                return (
                                                    <button 
                                                        onClick={() => statusHandler(status, item?._id)} 
                                                        key={index} 
                                                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                            isAccept 
                                                                ? 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50' 
                                                                : 'text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50'
                                                        }`}
                                                    >
                                                        {isAccept ? <CheckCircle2 className='w-4 h-4 text-emerald-500' /> : <XCircle className='w-4 h-4 text-rose-500' />}
                                                        <span>{status}</span>
                                                    </button>
                                                )
                                            })}
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

export default ApplicantsTable