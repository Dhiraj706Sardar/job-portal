import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldCheck, FileText, Lock, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ALL_TABS = [
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'security', label: 'Security & Trust', icon: ShieldCheck },
    { id: 'employer-info', label: 'Employer Solutions', icon: Building },
];

const LegalDialog = ({ isOpen, onClose, initialTab = 'privacy' }) => {
    const { user } = useSelector(store => store.auth);
    const tabs = ALL_TABS.filter(tab => !(user?.role === 'student' && tab.id === 'employer-info'));

    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        if (initialTab) {
            if (user?.role === 'student' && initialTab === 'employer-info') {
                setActiveTab('privacy');
            } else {
                setActiveTab(initialTab);
            }
        }
    }, [initialTab, isOpen, user?.role]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
                
                <DialogHeader className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
                            Trust, Security & Legal Center
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                        Transparent guidelines ensuring a fair, secure, and privacy-first tech career marketplace.
                    </DialogDescription>

                    <div className="flex items-center gap-1.5 pt-3 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                                        isActive
                                            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pr-5">
                    {activeTab === 'privacy' && (
                        <div className="space-y-4">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs">
                                <span className="font-semibold text-slate-900 dark:text-slate-100">Last Updated:</span> September 2026 • <strong>Version 2.4</strong>
                            </div>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    1. Data We Collect
                                </h3>
                                <p>
                                    JobPortal collects profile information (name, contact email, phone number, bio, skill tags, and uploaded resume PDFs) exclusively to facilitate matches between tech talent and verified hiring companies. We do not sell user data to advertising third parties.
                                </p>
                            </section>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    2. Resume & Applicant Confidentiality
                                </h3>
                                <p>
                                    Your resume and contact information are only made visible to verified recruiters of companies whose specific job openings you actively apply for. Your profile is not publicly scraped or distributed without your direct application action.
                                </p>
                            </section>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    3. Authentication & Cookies
                                </h3>
                                <p>
                                    We utilize secure JSON Web Tokens (JWT) stored in HTTP-only credentials or secure storage for seamless session verification. We do not track cross-site behavioral telemetry.
                                </p>
                            </section>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    4. Data Deletion & Rights
                                </h3>
                                <p>
                                    Users retain full ownership of their data. You may update your profile credentials, replace your resume, or request complete account erasure at any time through our security channels.
                                </p>
                            </section>
                        </div>
                    )}

                    {activeTab === 'terms' && (
                        <div className="space-y-4">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs">
                                <span className="font-semibold text-slate-900 dark:text-slate-100">Standard Service Agreement:</span> Binding terms for candidates and employers.
                            </div>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                    1. Candidate Conduct
                                </h3>
                                <p>
                                    Applicants agree to provide accurate, truthful details regarding their professional experience, skills, and work eligibility. Automated scraping or misuse of application endpoints is strictly prohibited.
                                </p>
                            </section>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                    2. Employer Listing Integrity
                                </h3>
                                <p>
                                    Recruiters must represent legitimate registered corporate entities. Postings must reflect bona fide hiring opportunities. Multi-level marketing, unpaid fee-for-employment, or misleading compensation terms are ground for immediate ban.
                                </p>
                            </section>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                    3. Platform Role
                                </h3>
                                <p>
                                    JobPortal provides the discovery and application facilitation infrastructure. Employment contracts and compensation negotiations remain solely between the candidate and hiring entity.
                                </p>
                            </section>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-4">
                            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300">
                                <span className="font-semibold">Security Posture:</span> Industry-standard encryption and role-based access control.
                            </div>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    Cryptographic Password Protection
                                </h3>
                                <p>
                                    All user credentials are encrypted using modern salted bcrypt hashing before storage. Passwords are never logged or stored in plaintext.
                                </p>
                            </section>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    Role-Based Access Control (RBAC)
                                </h3>
                                <p>
                                    Backend routes and application state are segmented by role (Jobseeker vs Recruiter). Protected endpoints verify cryptographic signature tokens on each request, preventing unauthorized cross-tenant data access.
                                </p>
                            </section>

                            <section className="space-y-1.5">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    Document & Cloud Storage Security
                                </h3>
                                <p>
                                    Resumes and profile media are hosted in isolated cloud storage with strictly enforced MIME type verification and sanitized filenames to prevent script injection.
                                </p>
                            </section>
                        </div>
                    )}

                    {activeTab === 'employer-info' && (
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/30 border border-indigo-200/80 dark:border-indigo-800/60">
                                <h3 className="text-base font-bold text-indigo-950 dark:text-indigo-200 mb-1">
                                    Hire High-Velocity Tech Talent
                                </h3>
                                <p className="text-xs text-indigo-800 dark:text-indigo-300">
                                    JobPortal connects growth-stage startups and enterprise engineering teams with pre-screened developers, designers, and tech leaders.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Company Workspace</h4>
                                    <p className="text-slate-500 dark:text-slate-400">Register company branding, logo, website, and company location.</p>
                                </div>
                                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Instant Job Publishing</h4>
                                    <p className="text-slate-500 dark:text-slate-400">Post roles with specific salary ranges, requirements, and job types.</p>
                                </div>
                                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Applicant Management</h4>
                                    <p className="text-slate-500 dark:text-slate-400">Review resumes, view candidate details, and update application status (Accepted/Rejected).</p>
                                </div>
                                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Targeted Reach</h4>
                                    <p className="text-slate-500 dark:text-slate-400">Surface your openings to candidates actively searching by stack (React, Node, etc.).</p>
                                </div>
                            </div>

                            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                                <Link to="/signup?role=recruiter" onClick={onClose} className="flex-1">
                                    <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20">
                                        <span>Create Recruiter Account</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Link to="/login?role=recruiter" onClick={onClose} className="flex-1">
                                    <Button variant="outline" className="w-full rounded-xl dark:border-slate-800 font-semibold">
                                        <span>Recruiter Sign In</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                        JobPortal Inc. • Engineering Career Network
                    </span>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={onClose}
                        className="rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LegalDialog;
