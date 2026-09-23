import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className='overflow-x-auto'>
            <Table>
                <TableCaption className='text-xs text-slate-400 dark:text-slate-500 mt-4'>
                    A list of your registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow className='border-b border-slate-200 dark:border-slate-800 hover:bg-transparent'>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Logo</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Name</TableHead>
                        <TableHead className='text-slate-700 dark:text-slate-300 font-semibold'>Registered Date</TableHead>
                        <TableHead className="text-right text-slate-700 dark:text-slate-300 font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!filterCompany || filterCompany.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-slate-500 dark:text-slate-400">
                                No companies found. Create a new company to get started.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company._id} className='border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors'>
                                <TableCell>
                                    <Avatar className='w-10 h-10 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg'>
                                        <AvatarImage src={company.logo} alt={company.name} className='object-cover p-1' />
                                        <AvatarFallback className='rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold'>
                                            <Building2 className='w-4 h-4' />
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className='font-semibold text-slate-900 dark:text-slate-100'>
                                    {company.name}
                                </TableCell>
                                <TableCell className='text-slate-600 dark:text-slate-400 text-sm'>
                                    {company.createdAt ? new Date(company.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors'>
                                            <MoreHorizontal className='w-4 h-4 text-slate-500 dark:text-slate-400' />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-xl">
                                            <button 
                                                onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                className='w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                            >
                                                <Edit2 className='w-3.5 h-3.5 text-indigo-500' />
                                                <span>Edit</span>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable