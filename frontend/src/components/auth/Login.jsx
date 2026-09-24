import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Lock, Mail, UserCheck, Briefcase } from 'lucide-react'

const Login = () => {
    const [searchParams] = useSearchParams();
    const initialRole = searchParams.get('role') === 'recruiter' ? 'recruiter' : 'student';

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: initialRole,
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam === 'recruiter' || roleParam === 'student') {
            setInput(prev => ({ ...prev, role: roleParam }));
        }
    }, [searchParams]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
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
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                }
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
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
                <div className='w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-indigo-950/20 p-6 sm:p-8 backdrop-blur-sm'>
                    <div className='text-center mb-6'>
                        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
                            Welcome Back
                        </h1>
                        <p className='text-sm text-slate-500 dark:text-slate-400 mt-1.5'>
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-4'>
                        {/* Role Selector */}
                        <div>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block'>
                                I am signing in as
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

                        {/* Email Input */}
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
                                    placeholder="you@company.com"
                                    required
                                    className='pl-10 h-11 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus-visible:ring-indigo-500'
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className='space-y-1.5'>
                            <div className='flex items-center justify-between'>
                                <Label className='text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300'>
                                    Password
                                </Label>
                            </div>
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

                        {/* Submit Button */}
                        <div className='pt-2'>
                            {loading ? (
                                <Button disabled className="w-full h-11 rounded-xl bg-indigo-600 text-white font-semibold flex items-center justify-center">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Signing In...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-indigo-500/25 transition-all active:scale-[0.99]"
                                >
                                    Sign In
                                </Button>
                            )}
                        </div>

                        <div className='text-center pt-2'>
                            <p className='text-sm text-slate-500 dark:text-slate-400'>
                                Don&apos;t have an account?{' '}
                                <Link to="/signup" className='font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'>
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login