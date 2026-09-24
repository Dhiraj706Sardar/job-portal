import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBookmarks } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

export const useBookmarks = () => {
    const { user, bookmarks = [] } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?._id) {
            try {
                const stored = localStorage.getItem(`jobportal_bookmarks_${user._id}`);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        dispatch(setBookmarks(parsed));
                    }
                }
            } catch (err) {
                console.error("Failed to parse bookmarks from storage:", err);
            }
        }
    }, [user?._id, dispatch]);

    const isBookmarked = useCallback((jobId) => {
        if (!jobId || !bookmarks) return false;
        return bookmarks.some(b => (b?._id || b) === jobId);
    }, [bookmarks]);

    const toggleBookmark = useCallback(async (job, e) => {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        // Authentication guard
        if (!user) {
            toast.error("Please login to save jobs to your bookmarks.", {
                action: {
                    label: "Login",
                    onClick: () => navigate("/login")
                }
            });
            return false;
        }

        if (!job) return false;
        const jobId = job?._id || job;
        const alreadyBookmarked = bookmarks.some(b => (b?._id || b) === jobId);

        let updatedBookmarks;
        if (alreadyBookmarked) {
            updatedBookmarks = bookmarks.filter(b => (b?._id || b) !== jobId);
            toast.info(`Removed "${job?.title || 'Job'}" from bookmarks.`);
        } else {
            updatedBookmarks = [...bookmarks, job];
            toast.success(`Saved "${job?.title || 'Job'}" to bookmarks!`);
        }

        // Update Redux state
        dispatch(setBookmarks(updatedBookmarks));

        // Persist to user's localStorage
        if (user?._id) {
            try {
                localStorage.setItem(`jobportal_bookmarks_${user._id}`, JSON.stringify(updatedBookmarks));
            } catch (err) {
                console.error("Failed to persist bookmarks to localStorage:", err);
            }
        }

        // Try backend sync if endpoint is active (non-blocking)
        try {
            await axios.get(`${USER_API_END_POINT}/bookmark/${jobId}`, { withCredentials: true });
        } catch {
            // Silently ignore if backend route is not available on remote server
        }

        return !alreadyBookmarked;
    }, [user, bookmarks, dispatch, navigate]);

    return {
        bookmarks,
        isBookmarked,
        toggleBookmark,
        isAuthenticated: Boolean(user)
    };
};

export default useBookmarks;
