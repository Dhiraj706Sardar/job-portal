import { Button } from './ui/button';
import { Bookmark, MapPin } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import useBookmarks from '@/hooks/useBookmarks';

const Job = ({ job: propJob, jobs }) => {
    const job = propJob || jobs;
    const navigate = useNavigate();
    const { isBookmarked: checkBookmarked, toggleBookmark } = useBookmarks();
    const isBookmarked = checkBookmarked(job?._id);

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "Recently";
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
        if (days <= 0) return "Today";
        if (days === 1) return "1 day ago";
        return `${days} days ago`;
    };

    const handleBookmark = (e) => {
        toggleBookmark(job, e);
    };

    return (
        <div 
            onClick={() => navigate(`/description/${job?._id}`)}
            className='p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-600/70 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer group'
        >
            <div>
                <div className='flex items-center justify-between'>
                    <span className='text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full'>
                        {daysAgoFunction(job?.createdAt)}
                    </span>
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={handleBookmark}
                        className={`rounded-full h-8 w-8 transition-colors ${
                            isBookmarked 
                                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60' 
                                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
                    </Button>
                </div>

                <div className='flex items-center gap-3 my-3'>
                    <Avatar className='w-10 h-10 border border-slate-100 dark:border-slate-800 shadow-sm flex-shrink-0'>
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                    <div className='min-w-0'>
                        <h3 className='font-semibold text-sm text-slate-900 dark:text-white truncate'>{job?.company?.name || 'Company'}</h3>
                        <p className='text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate'>
                            <MapPin className='w-3 h-3 text-slate-400 flex-shrink-0' />
                            {job?.location || 'Remote'}
                        </p>
                    </div>
                </div>

                {/* Job Title & Description */}
                <div className='my-2'>
                    <h2 className='font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1'>
                        {job?.title}
                    </h2>
                    <p className='text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed'>
                        {job?.description}
                    </p>
                </div>

                {/* Tags / Badges */}
                <div className='flex flex-wrap items-center gap-1.5 mt-3'>
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

            {/* Action Buttons */}
            <div className='flex items-center gap-2.5 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80'>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }} 
                    variant="outline" 
                    size="sm"
                    className='flex-1 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800'
                >
                    View Details
                </Button>
                <Button 
                    onClick={handleBookmark}
                    variant={isBookmarked ? "secondary" : "default"}
                    size="sm"
                    className={`rounded-xl text-xs font-semibold ${
                        isBookmarked 
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' 
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                >
                    {isBookmarked ? 'Saved' : 'Save'}
                </Button>
            </div>
        </div>
    );
};

export default Job;