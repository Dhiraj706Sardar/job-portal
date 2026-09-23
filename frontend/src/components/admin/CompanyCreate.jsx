import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowLeft, ArrowRight } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Please enter a company name");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to register company");
        }
    }

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-16'>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 sm:px-6 py-12'>
                <div className='bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors space-y-6'>
                    <div className='space-y-2'>
                        <div className='w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4'>
                            <Building2 className='w-6 h-6' />
                        </div>
                        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                            Register Your Company
                        </h1>
                        <p className='text-sm text-slate-500 dark:text-slate-400'>
                            What is the name of your organization? You will be able to update its logo, website, and description in the next step.
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="companyName" className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                            Company Name
                        </Label>
                        <Input
                            id="companyName"
                            type="text"
                            className="h-11 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                            placeholder="e.g. Google, Stripe, Vercel, Supabase"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800'>
                        <Button 
                            variant="outline" 
                            onClick={() => navigate("/admin/companies")}
                            className='rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5'
                        >
                            <ArrowLeft className='w-4 h-4' /> Cancel
                        </Button>
                        <Button 
                            onClick={registerNewCompany}
                            className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-indigo-500/25 flex items-center gap-1.5 transition-all'
                        >
                            Continue <ArrowRight className='w-4 h-4' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate