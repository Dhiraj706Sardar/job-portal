import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[480px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-2xl">
                <DialogHeader>
                    <DialogTitle className='text-xl font-bold text-slate-900 dark:text-slate-100'>
                        Update Profile
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className='space-y-4 pt-2'>
                    <div className='space-y-1.5'>
                        <Label htmlFor="fullname" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Full Name
                        </Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="phoneNumber" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Phone Number
                        </Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Headline / Bio
                        </Label>
                        <Input
                            id="bio"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            placeholder="e.g. Senior Fullstack Engineer passionate about TypeScript"
                            className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="skills" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Skills (comma separated)
                        </Label>
                        <Input
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            placeholder="React, Node.js, Next.js, Python"
                            className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="file" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Update Resume (PDF)
                        </Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                            accept="application/pdf"
                            onChange={fileChangeHandler}
                            className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl cursor-pointer"
                        />
                    </div>

                    <DialogFooter className='pt-2'>
                        {loading ? (
                            <Button disabled className="w-full bg-indigo-600 text-white rounded-xl">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all">
                                Save Changes
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;