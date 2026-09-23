import { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '../ui/badge';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    const totalApplicants = applicants?.applications?.length || 0;

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-16'>
            <Navbar />
            <div className='w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 space-y-6'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                        <Button 
                            onClick={() => navigate("/admin/jobs")} 
                            variant="outline" 
                            className="rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
                        >
                            <ArrowLeft className='w-4 h-4' />
                            <span>Jobs</span>
                        </Button>
                        <div>
                            <div className='flex items-center gap-2.5'>
                                <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                                    Candidates & Applicants
                                </h1>
                                <Badge variant="secondary" className='bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 font-bold'>
                                    {totalApplicants}
                                </Badge>
                            </div>
                            <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5'>
                                Review resumes and update application decisions
                            </p>
                        </div>
                    </div>
                </div>

                <div className='bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm transition-colors'>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants