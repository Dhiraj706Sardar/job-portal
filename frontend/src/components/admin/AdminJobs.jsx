import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus, Search } from 'lucide-react'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-16'>
            <Navbar />
            <div className='w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 space-y-6'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                            Posted Jobs
                        </h1>
                        <p className='text-sm text-slate-500 dark:text-slate-400 mt-1'>
                            Manage your job postings, track applications, and review candidates
                        </p>
                    </div>
                    <Button 
                        onClick={() => navigate("/admin/jobs/create")}
                        className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-indigo-500/25 flex items-center gap-2 self-start sm:self-center transition-all'
                    >
                        <Plus className='w-4 h-4' /> Post New Job
                    </Button>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='relative w-full max-w-sm'>
                        <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                        <Input
                            className="pl-10 h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl"
                            placeholder="Filter by title or company..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                </div>

                <div className='bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm transition-colors'>
                    <AdminJobsTable />
                </div>
            </div>
        </div>
    )
}

export default AdminJobs