import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, Lock, Mail, Phone, User, UserCheck, Briefcase, Upload } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const setRole = (role) => {
        setInput({ ...input, role });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.role) {
            toast.error("Please select a role (Student or Recruiter)");
            return;
        }
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300'>
            <Navbar />
            <div className='flex-1 flex items-center justify-center px-4 sm:px-6 py-12'>
                <div className='w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-indigo-950/20 p-6 sm:p-8 backdrop-blur-sm'>
                    <div className='text-center mb-6'>
                        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                            Create an Account
                        </h1>
                        <p className='text-sm text-slate-500 dark:text-slate-400 mt-1.5'>
                            Join thousands of developers and top tech companies
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-4'>
                        {/* Role Selector */}
                        <div>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block'>
                                I want to register as
                            </Label>
                            <div className='grid grid-cols-2 gap-3'>
                                <button
                                    type='button'
                                    onClick={() => setRole('student')}
                                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-sm font-semibold transition-all ${
                                        input.role === 'student'
                                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:bg-indigo-950/50 dark:border-indigo-500 dark:text-indigo-300 shadow-sm'
                                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                                    }`}
                                >
                                    <UserCheck className='w-4 h-4' />
                                    <span>Jobseeker</span>
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setRole('recruiter')}
                                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-sm font-semibold transition-all ${
                                        input.role === 'recruiter'
                                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 dark:bg-indigo-950/50 dark:border-indigo-500 dark:text-indigo-300 shadow-sm'
                                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                                    }`}
                                >
                                    <Briefcase className='w-4 h-4' />
                                    <span>Recruiter</span>
                                </button>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className='space-y-1.5'>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                Full Name
                            </Label>
                            <div className='relative'>
                                <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    required
                                    className='pl-10 h-11 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus-visible:ring-indigo-500'
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className='space-y-1.5'>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                Email Address
                            </Label>
                            <div className='relative'>
                                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="john@example.com"
                                    required
                                    className='pl-10 h-11 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus-visible:ring-indigo-500'
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className='space-y-1.5'>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                Phone Number
                            </Label>
                            <div className='relative'>
                                <Phone className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                <Input
                                    type="tel"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="9876543210"
                                    required
                                    className='pl-10 h-11 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus-visible:ring-indigo-500'
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className='space-y-1.5'>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                Password
                            </Label>
                            <div className='relative'>
                                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    required
                                    className='pl-10 h-11 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus-visible:ring-indigo-500'
                                />
                            </div>
                        </div>

                        {/* Profile Picture Upload */}
                        <div className='space-y-1.5'>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                Profile Photo (Optional)
                            </Label>
                            <div className='flex items-center gap-3'>
                                <label className='flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium'>
                                    <Upload className='w-4 h-4 text-slate-400' />
                                    <span>{input.file ? input.file.name : "Choose profile image"}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-2'>
                            {loading ? (
                                <Button disabled className="w-full h-11 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Creating account...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-indigo-500/25 transition-all active:scale-[0.99]"
                                >
                                    Create Account
                                </Button>
                            )}
                        </div>

                        <div className='text-center pt-2'>
                            <p className='text-sm text-slate-500 dark:text-slate-400'>
                                Already have an account?{' '}
                                <Link to="/login" className='font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'>
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup