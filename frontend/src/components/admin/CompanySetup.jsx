import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Upload } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update company");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: singleCompany.file || null
            });
        }
    }, [singleCompany]);

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-16'>
            <Navbar />
            <div className='max-w-3xl mx-auto px-4 sm:px-6 py-8'>
                <div className='bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors'>
                    <div className='flex items-center gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800'>
                        <Button 
                            onClick={() => navigate("/admin/companies")} 
                            variant="outline" 
                            className="rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
                        >
                            <ArrowLeft className='w-4 h-4' />
                            <span>Back</span>
                        </Button>
                        <div>
                            <h1 className='text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                                Company Details
                            </h1>
                            <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400'>
                                Update company information, brand assets, and web presence
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-5'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='space-y-1.5'>
                                <Label htmlFor="name" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Company Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    required
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>
                            <div className='space-y-1.5'>
                                <Label htmlFor="website" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Website URL
                                </Label>
                                <Input
                                    id="website"
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    placeholder="https://company.com"
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>
                            <div className='space-y-1.5 sm:col-span-2'>
                                <Label htmlFor="location" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Location / Headquarters
                                </Label>
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="San Francisco, CA or Remote"
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>
                            <div className='space-y-1.5 sm:col-span-2'>
                                <Label htmlFor="description" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    About Company
                                </Label>
                                <Input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Brief overview of the mission and culture..."
                                    className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                                />
                            </div>
                            <div className='space-y-1.5 sm:col-span-2'>
                                <Label className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Company Logo
                                </Label>
                                <label className='flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium'>
                                    <Upload className='w-4 h-4 text-slate-400' />
                                    <span>{input.file ? input.file.name : "Upload company logo image"}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className='pt-4 border-t border-slate-100 dark:border-slate-800'>
                            {loading ? (
                                <Button disabled className="w-full h-11 bg-indigo-600 text-white rounded-xl">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating company...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-indigo-500/25 transition-all"
                                >
                                    Save Changes
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup