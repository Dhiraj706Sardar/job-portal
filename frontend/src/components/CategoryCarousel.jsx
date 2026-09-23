import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code2, Server, Layers, Cloud, Cpu, Smartphone, Palette, Shield } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", query: "Frontend", icon: Code2, count: "40+ Roles" },
    { name: "Backend Engineer", query: "Backend", icon: Server, count: "35+ Roles" },
    { name: "Full Stack Developer", query: "Full Stack", icon: Layers, count: "50+ Roles" },
    { name: "Cloud & DevOps", query: "DevOps", icon: Cloud, count: "25+ Roles" },
    { name: "Data & AI / ML", query: "Data", icon: Cpu, count: "20+ Roles" },
    { name: "Mobile Developer", query: "Mobile", icon: Smartphone, count: "18+ Roles" },
    { name: "UI/UX Designer", query: "Designer", icon: Palette, count: "15+ Roles" },
    { name: "Cybersecurity", query: "Security", icon: Shield, count: "10+ Roles" },
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 my-16">
            <div className="text-center mb-8">
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                    Explore Roles
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    Popular Job Categories
                </h3>
            </div>

            <div className="relative px-8 sm:px-12">
                <Carousel className="w-full">
                    <CarouselContent className="-ml-3 sm:-ml-4">
                        {categories.map((cat, index) => {
                            const Icon = cat.icon;
                            return (
                                <CarouselItem key={index} className="pl-3 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                                    <button
                                        onClick={() => searchJobHandler(cat.query)}
                                        className="w-full text-left p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 hover:-translate-y-1 transition-all duration-200 group flex items-start gap-4"
                                    >
                                        <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                                {cat.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                {cat.count}
                                            </p>
                                        </div>
                                    </button>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300" />
                    <CarouselNext className="right-0 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300" />
                </Carousel>
            </div>
        </section>
    );
};

export default CategoryCarousel;