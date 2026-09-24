import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Download } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login?role=student");
        }
    }, [user, navigate]);

    const isResume = Boolean(user?.profile?.resume);

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 flex-1 w-full'>
                {/* Profile Information Card */}
                <div className='bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors relative overflow-hidden'>
                    <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-6'>
                        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left'>
                            <Avatar className="h-24 w-24 border-2 border-indigo-100 dark:border-indigo-950 shadow-md">
                                <AvatarImage 
                                    src={user?.profile?.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"} 
                                    alt={user?.fullname} 
                                    className='object-cover'
                                />
                                <AvatarFallback className='bg-indigo-600 text-white text-2xl font-bold'>
                                    {user?.fullname?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-1.5'>
                                <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
                                    {user?.fullname}
                                </h1>
                                <p className='text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed'>
                                    {user?.profile?.bio || "No bio added yet. Click edit to add your headline or bio."}
                                </p>
                            </div>
                        </div>

                        <Button 
                            onClick={() => setOpen(true)} 
                            variant="outline"
                            className="rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 self-center sm:self-start"
                        >
                            <Pen className='w-4 h-4' />
                            <span>Edit Profile</span>
                        </Button>
                    </div>

                    {/* Contact Details */}
                    <div className='mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm'>
                            <div className='p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'>
                                <Mail className='w-4 h-4' />
                            </div>
                            <span>{user?.email || "No email available"}</span>
                        </div>
                        <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm'>
                            <div className='p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'>
                                <Contact className='w-4 h-4' />
                            </div>
                            <span>{user?.phoneNumber || "No phone number available"}</span>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className='mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-3'>
                        <h2 className='text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                            Skills & Expertise
                        </h2>
                        <div className='flex flex-wrap gap-2'>
                            {user?.profile?.skills && user.profile.skills.length > 0 ? (
                                user.profile.skills.map((item, index) => (
                                    <Badge 
                                        key={index}
                                        variant="secondary"
                                        className='bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 px-3 py-1 font-medium'
                                    >
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className='text-sm text-slate-400 dark:text-slate-500'>No skills added yet</span>
                            )}
                        </div>
                    </div>

                    {/* Resume */}
                    <div className='mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-2'>
                        <Label className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Resume
                        </Label>
                        {isResume ? (
                            <a 
                                target='_blank' 
                                rel="noreferrer"
                                href={user?.profile?.resume} 
                                className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors text-sm font-semibold'
                            >
                                <FileText className='w-4 h-4' />
                                <span>{user?.profile?.resumeOriginalName || "View Resume"}</span>
                                <Download className='w-3.5 h-3.5 ml-1 opacity-70' />
                            </a>
                        ) : (
                            <span className='text-sm text-slate-400 dark:text-slate-500'>No resume uploaded</span>
                        )}
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className='bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors space-y-4'>
                    <div className='flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800'>
                        <h2 className='text-xl font-bold text-slate-900 dark:text-slate-100'>
                            Applied Jobs
                        </h2>
                    </div>
                    <AppliedJobTable />
                </div>
            </div>

            <Footer />
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile