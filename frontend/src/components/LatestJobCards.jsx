import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import { MapPin, ArrowUpRight } from 'lucide-react';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600/60 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group'
        >
            <div>
                {/* Company info */}
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar className='w-11 h-11 border border-slate-100 dark:border-slate-800 shadow-sm'>
                            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                        </Avatar>
                        <div className='min-w-0'>
                            <h3 className='font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate'>
                                {job?.company?.name || 'Company'}
                            </h3>
                            <p className='text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5'>
                                <MapPin className='w-3 h-3 text-slate-400' />
                                {job?.location || 'Remote'}
                            </p>
                        </div>
                    </div>
                    <div className='w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>
                        <ArrowUpRight className='w-4 h-4' />
                    </div>
                </div>

                {/* Job Title & description */}
                <div className='my-3'>
                    <h2 className='font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1'>
                        {job?.title}
                    </h2>
                    <p className='text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed'>
                        {job?.description}
                    </p>
                </div>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap items-center gap-1.5 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80'>
                <Badge variant="secondary" className='text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-900/50 font-medium text-xs'>
                    {job?.position} {job?.position === 1 ? 'pos' : 'positions'}
                </Badge>
                <Badge variant="secondary" className='text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border border-rose-200/50 dark:border-rose-900/50 font-medium text-xs'>
                    {job?.jobType}
                </Badge>
                <Badge variant="secondary" className='text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border border-purple-200/50 dark:border-purple-900/50 font-medium text-xs'>
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;