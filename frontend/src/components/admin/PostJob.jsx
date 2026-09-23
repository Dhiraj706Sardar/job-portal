import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Briefcase, PlusCircle, AlertCircle } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 1,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.companyId) {
            toast.error("Please select a company for this job post");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-16'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 sm:px-6 py-8'>
                <div className='bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors'>
                    <div className='pb-6 mb-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between'>
                        <div>
                            <div className='flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 mb-1'>
                                <Briefcase className='w-5 h-5' />
                                <span className='text-xs font-bold uppercase tracking-wider'>Recruiter Portal</span>
                            </div>
                            <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                                Post a New Job
                            </h1>
                            <p className='text-sm text-slate-500 dark:text-slate-400 mt-0.5'>
                                Reach thousands of verified candidates looking for their next opportunity
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {/* Job Title */}
                            <div className='space-y-1.5'>
                                <Label htmlFor="title" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Job Title
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Senior Frontend Engineer"
                                    required
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>

                            {/* Company Select */}
                            <div className='space-y-1.5'>
                                <Label className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Select Company
                                </Label>
                                {companies.length > 0 ? (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl">
                                            <SelectValue placeholder="Choose a registered company" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company?.name?.toLowerCase()} className="cursor-pointer">
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <div className='flex items-center gap-2 p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs text-amber-700 dark:text-amber-400'>
                                        <AlertCircle className='w-4 h-4 flex-shrink-0' />
                                        <span>Please create a company first before posting jobs.</span>
                                    </div>
                                )}
                            </div>

                            {/* Job Description */}
                            <div className='space-y-1.5 sm:col-span-2'>
                                <Label htmlFor="description" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Job Description
                                </Label>
                                <Input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Describe responsibilities, team dynamics, and expectations..."
                                    required
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>

                            {/* Requirements */}
                            <div className='space-y-1.5 sm:col-span-2'>
                                <Label htmlFor="requirements" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Requirements (comma separated)
                                </Label>
                                <Input
                                    id="requirements"
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="React, TypeScript, Tailwind CSS, REST APIs"
                                    required
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>

                            {/* Salary */}
                            <div className='space-y-1.5'>
                                <Label htmlFor="salary" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Salary (LPA)
                                </Label>
                                <Input
                                    id="salary"
                                    type="number"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 15"
                                    required
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>

                            {/* Location */}
                            <div className='space-y-1.5'>
                                <Label htmlFor="location" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Bengaluru, India or Remote"
                                    required
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>

                            {/* Job Type */}
                            <div className='space-y-1.5'>
                                <Label htmlFor="jobType" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Job Type
                                </Label>
                                <Input
                                    id="jobType"
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    placeholder="Full-time, Part-time, Contract, Remote"
                                    required
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>

                            {/* Experience Level */}
                            <div className='space-y-1.5'>
                                <Label htmlFor="experience" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Experience (Years)
                                </Label>
                                <Input
                                    id="experience"
                                    type="number"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 3"
                                    required
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>

                            {/* Open Positions */}
                            <div className='space-y-1.5 sm:col-span-2'>
                                <Label htmlFor="position" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Number of Open Positions
                                </Label>
                                <Input
                                    id="position"
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    placeholder="1"
                                    min="1"
                                    required
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>
                        </div> 

                        <div className='pt-4 border-t border-slate-100 dark:border-slate-800'>
                            {loading ? (
                                <Button disabled className="w-full h-11 bg-indigo-600 text-white rounded-xl">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Posting job...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    disabled={companies.length === 0}
                                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                                >
                                    <PlusCircle className='w-4 h-4' /> Publish Job Post
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob