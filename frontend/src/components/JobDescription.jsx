import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { ArrowLeft, MapPin, Briefcase, Calendar, Users, DollarSign, Award, ExternalLink } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        if (singleJob?.applications && user?._id) {
            setIsApplied(singleJob.applications.some(application => 
                (application.applicant === user._id) || (application.applicant?._id === user._id)
            ));
        }
    }, [singleJob, user?._id]);

    const applyJobHandler = async () => {
        if (!user) {
            toast.error("Please login to apply for this job.");
            return;
        }
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...(singleJob.applications || []), { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply");
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    if (res.data.job.applications && user?._id) {
                        setIsApplied(res.data.job.applications.some(app => 
                            (app.applicant === user._id) || (app.applicant?._id === user._id)
                        ));
                    }
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to load job details.");
            } finally {
                setLoading(false);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const formattedDate = singleJob?.createdAt 
        ? new Date(singleJob.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : 'Recently';

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300'>
            <Navbar />
            <div className='w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8'>
                {/* Back button */}
                <Link 
                    to="/jobs" 
                    className='inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors group'
                >
                    <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' /> Back to Jobs
                </Link>

                {loading ? (
                    <div className='bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse space-y-6'>
                        <div className='h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3'></div>
                        <div className='h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4'></div>
                        <div className='h-32 bg-slate-200 dark:bg-slate-800 rounded'></div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Main Job Content */}
                        <div className='lg:col-span-2 space-y-6'>
                            <div className='bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors'>
                                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800'>
                                    <div className='space-y-3'>
                                        <div className='flex items-center gap-4'>
                                            <Avatar className='w-14 h-14 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm rounded-xl'>
                                                <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} className='object-cover p-1' />
                                            </Avatar>
                                            <div>
                                                <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight'>
                                                    {singleJob?.title}
                                                </h1>
                                                <p className='text-sm text-slate-600 dark:text-slate-400 font-medium mt-0.5'>
                                                    {singleJob?.company?.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className='flex flex-wrap items-center gap-2 pt-1'>
                                            <Badge variant="secondary" className='bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60 font-semibold px-2.5 py-1'>
                                                {singleJob?.position} {singleJob?.position === 1 ? 'Position' : 'Positions'}
                                            </Badge>
                                            <Badge variant="secondary" className='bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/60 font-semibold px-2.5 py-1'>
                                                {singleJob?.jobType}
                                            </Badge>
                                            <Badge variant="secondary" className='bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-900/60 font-semibold px-2.5 py-1'>
                                                {singleJob?.salary} LPA
                                            </Badge>
                                            <Badge variant="secondary" className='bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/60 font-semibold px-2.5 py-1'>
                                                {singleJob?.experienceLevel} {singleJob?.experienceLevel === 1 ? 'year exp' : 'years exp'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={isApplied ? null : applyJobHandler}
                                        disabled={isApplied}
                                        size="lg"
                                        className={`rounded-xl font-semibold shadow-md transition-all self-start sm:self-center px-6 py-2.5 ${
                                            isApplied 
                                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800 shadow-none' 
                                                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/25 active:scale-95'
                                        }`}
                                    >
                                        {isApplied ? 'Already Applied' : 'Apply Now'}
                                    </Button>
                                </div>

                                {/* Job Details */}
                                <div className='py-6 space-y-6'>
                                    <div>
                                        <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-3'>
                                            About the Role
                                        </h2>
                                        <p className='text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base'>
                                            {singleJob?.description}
                                        </p>
                                    </div>

                                    {/* Requirements */}
                                    {singleJob?.requirements && singleJob.requirements.length > 0 && (
                                        <div className='pt-2'>
                                            <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-3'>
                                                Required Skills & Qualifications
                                            </h2>
                                            <div className='flex flex-wrap gap-2'>
                                                {singleJob.requirements.map((skill, index) => (
                                                    <span 
                                                        key={index} 
                                                        className='px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm font-medium rounded-lg transition-colors'
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Job Overview & Company Info */}
                        <div className='space-y-6'>
                            {/* Overview Card */}
                            <div className='bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4 transition-colors'>
                                <h3 className='font-bold text-slate-900 dark:text-slate-100 text-lg border-b border-slate-100 dark:border-slate-800 pb-3'>
                                    Job Overview
                                </h3>
                                <div className='space-y-3.5 text-sm'>
                                    <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>
                                        <MapPin className='w-4 h-4 text-indigo-500 flex-shrink-0' />
                                        <span><strong className='text-slate-800 dark:text-slate-200 font-medium'>Location:</strong> {singleJob?.location}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>
                                        <DollarSign className='w-4 h-4 text-emerald-500 flex-shrink-0' />
                                        <span><strong className='text-slate-800 dark:text-slate-200 font-medium'>Salary:</strong> {singleJob?.salary} LPA</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>
                                        <Award className='w-4 h-4 text-amber-500 flex-shrink-0' />
                                        <span><strong className='text-slate-800 dark:text-slate-200 font-medium'>Experience:</strong> {singleJob?.experienceLevel} yrs</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>
                                        <Briefcase className='w-4 h-4 text-blue-500 flex-shrink-0' />
                                        <span><strong className='text-slate-800 dark:text-slate-200 font-medium'>Job Type:</strong> {singleJob?.jobType}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>
                                        <Users className='w-4 h-4 text-purple-500 flex-shrink-0' />
                                        <span><strong className='text-slate-800 dark:text-slate-200 font-medium'>Total Applicants:</strong> {singleJob?.applications?.length || 0}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>
                                        <Calendar className='w-4 h-4 text-rose-500 flex-shrink-0' />
                                        <span><strong className='text-slate-800 dark:text-slate-200 font-medium'>Posted:</strong> {formattedDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Company Card */}
                            {singleJob?.company && (
                                <div className='bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4 transition-colors'>
                                    <h3 className='font-bold text-slate-900 dark:text-slate-100 text-lg border-b border-slate-100 dark:border-slate-800 pb-3'>
                                        About the Company
                                    </h3>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className='w-12 h-12 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm rounded-xl'>
                                            <AvatarImage src={singleJob.company.logo} alt={singleJob.company.name} className='object-cover p-1' />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-bold text-slate-900 dark:text-slate-100'>{singleJob.company.name}</h4>
                                            {singleJob.company.location && (
                                                <p className='text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5'>
                                                    <MapPin className='w-3 h-3' /> {singleJob.company.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {singleJob.company.description && (
                                        <p className='text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed'>
                                            {singleJob.company.description}
                                        </p>
                                    )}
                                    {singleJob.company.website && (
                                        <a
                                            href={singleJob.company.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className='inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300'
                                        >
                                            Visit Company Website <ExternalLink className='w-3.5 h-3.5' />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDescription;