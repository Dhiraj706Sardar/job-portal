import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

const filterCategories = [
    {
        category: "Location",
        items: ["Bangalore", "Pune", "Mumbai", "Hyderabad", "Delhi", "Remote"]
    },
    {
        category: "Role",
        items: ["Frontend", "Backend", "Full Stack", "DevOps", "Mobile", "Intern"]
    },
    {
        category: "Job Type",
        items: ["Full-time", "Part-time", "Remote", "Internship"]
    }
];

const FilterCard = () => {
    const [selectedFilter, setSelectedFilter] = useState('');
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        if (searchedQuery) {
            setSelectedFilter(searchedQuery);
        }
    }, [searchedQuery]);

    const handleSelect = (item) => {
        if (selectedFilter.toLowerCase() === item.toLowerCase()) {
            setSelectedFilter('');
            dispatch(setSearchedQuery(''));
        } else {
            setSelectedFilter(item);
            dispatch(setSearchedQuery(item));
        }
    };

    const handleClear = () => {
        setSelectedFilter('');
        dispatch(setSearchedQuery(''));
    };

    return (
        <div className='w-full bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors'>
            <div className='flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800'>
                <div className='flex items-center gap-2'>
                    <Filter className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                    <h2 className='font-bold text-slate-900 dark:text-white text-base'>Filter Jobs</h2>
                </div>
                {selectedFilter && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleClear} 
                        className='text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 h-7 px-2 flex items-center gap-1'
                    >
                        <RotateCcw className='w-3 h-3' /> Clear
                    </Button>
                )}
            </div>

            <div className='divide-y divide-slate-100 dark:divide-slate-800/80'>
                {filterCategories.map((group, groupIdx) => (
                    <div key={groupIdx} className='py-4 space-y-2.5'>
                        <h3 className='font-semibold text-xs tracking-wider uppercase text-slate-500 dark:text-slate-400'>
                            {group.category}
                        </h3>
                        <div className='flex flex-wrap gap-1.5'>
                            {group.items.map((item, idx) => {
                                const isSelected = selectedFilter.toLowerCase() === item.toLowerCase();
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(item)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                            isSelected
                                                ? 'bg-indigo-600 dark:bg-indigo-600 text-white shadow-sm'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCard;