import React, {useEffect, useState} from 'react';
import {
    Award,
    Brain,
    ChevronDown,
    Code,
    Github,
    GraduationCap,
    Linkedin,
    Mail,
    Menu,
    Server,
    Terminal,
    User,
    X
} from 'lucide-react';

// --- DATA CONSTANTS ---

const NAV_LINKS = [
    {name: 'About', href: '#about'},
    {name: 'Experience', href: '#experience'},
    {name: 'Projects', href: '#projects'},
    {name: 'Skills', href: '#skills'},
    {name: 'Education', href: '#education'},
    {name: 'Contact', href: '#contact'},
];

const EXPERIENCE = [
    {
        id: 1,
        role: 'Software Engineer',
        company: 'Zenon',
        location: 'Noida, India',
        period: 'Jul 2023 - May 2025',
        description: [
            'Engineered scalable client-facing web applications using Spring Boot (Java) and Angular.',
            'Led the development of a "Sales & Revenue Forecasting" system with scenario modeling.',
            'Built a Hiring Management System reducing manual administrative overhead.',
            'Optimized PostgreSQL queries and integrated Chart.js for real-time analytics.'
        ],
        tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'System Design']
    },
    {
        id: 2,
        role: 'Software Intern',
        company: 'Zenon',
        location: 'Noida, India',
        period: 'Jan 2023 - Jun 2023',
        description: [
            'Contributed to Frontend, Backend, and QA processes across the full SDLC.',
            'Refactored legacy code improving application performance and stability.',
            'Collaborated with DevOps to monitor CI/CD pipelines.'
        ],
        tech: ['Java', 'CI/CD', 'SQL', 'Debugging']
    },
    {
        id: 3,
        role: 'Software Development Intern',
        company: 'Mentorbrick',
        location: 'Noida, India',
        period: 'Jul 2020 - Mar 2021',
        description: [
            'Led development of a responsive Android app using React Native.',
            'Integrated Video Calling APIs and Firebase Cloud Messaging.',
            'Implemented secure authentication and state management.'
        ],
        tech: ['React Native', 'Firebase', 'Mobile Dev', 'JavaScript']
    }
];

const EDUCATION = [
    {
        id: 1,
        degree: 'MSc in Data Science',
        school: 'The University of Edinburgh',
        location: 'Edinburgh, UK',
        period: 'Sep 2025 - Present',
        details: 'Focus on Machine Learning, NLP, Deep Learning, and Data Systems Architecture. Researching predictive modeling using PyTorch and TensorFlow.'
    },
    {
        id: 2,
        degree: 'BTech in Computer Engineering',
        school: 'J.C. Bose University of Science & Technology',
        location: 'India',
        period: 'Aug 2019 - Jul 2023',
        details: 'Core Engineering foundation (DSA, OOP, DBMS). Joint Secretary of Technical Society (UCCDA) and Session Head of Coding Society (MANAN).'
    }
];

const PROJECTS = [
    {
        id: 1,
        title: 'Sales & Revenue Forecasting System',
        description: 'A predictive forecasting platform analyzing historical data to project future sales trends. Enabled scenario modeling with adjustable parameters for yearly, monthly, and weekly intervals.',
        tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'Chart.js', 'Predictive Analytics'],
        category: 'Full Stack & Data',
        github: null
    },
    {
        id: 2,
        title: 'Hiring Management System',
        description: 'Comprehensive tracking system automating candidate workflows from application to offer. Features real-time notifications, automated status updates, and dynamic recruiting dashboards.',
        tech: ['Spring Boot', 'Angular', 'MySQL', 'CI/CD', 'Automation'],
        category: 'Full Stack',
        github: null
    }
];

const SKILLS = [
    {category: 'Pinned', icon: <Award className="w-4 h-4"/>, items: ['Java', 'Python', 'Machine Learning']},
    {
        category: 'Core Engineering',
        icon: <Server className="w-4 h-4"/>,
        items: ['Spring Boot', 'Angular', 'Data Structures', 'SQL', 'AWS', 'System Design', 'Microservices', 'Distributed Systems']
    },
    {
        category: 'AI & Data',
        icon: <Brain className="w-4 h-4"/>,
        items: ['Deep Learning', 'NLP', 'PyTorch', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-Learn']
    },
    {
        category: 'Web & Tools',
        icon: <Code className="w-4 h-4"/>,
        items: ['React Native', 'TypeScript', 'Node.js', 'Docker', 'Jenkins', 'Git', 'CI/CD', 'Firebase']
    }
];

const CERTIFICATIONS = [
    'Deep Learning Specialization - DeepLearning.AI',
    'Natural Language Processing Specialization - DeepLearning.AI',
    'Angular - The Complete Guide - Udemy',
    'Java Online Course - Coding Blocks'
];

// --- COMPONENTS ---

const SectionTitle = ({title, subtitle}) => (
    <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">{title}</h2>
        {subtitle && <div className="mt-2 h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>}
    </div>
);

const Card = ({children, className = ""}) => (
    <div
        className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 ${className}`}>
        {children}
    </div>
);

const Badge = ({text, color = "blue"}) => {
    const colors = {
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    };

    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${colors[color] || colors.blue}`}>
      {text}
    </span>
    );
};

// --- MAIN APP ---

export default function Portfolio() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section
            const sections = NAV_LINKS.map(link => link.href.substring(1));
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href) => {
        setIsMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({top: offsetTop, behavior: 'smooth'});
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 selection:bg-blue-500/30">

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* NAVIGATION */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <div className="text-xl font-bold text-slate-100 tracking-tight">
                        Vivek Aggarwal<span className="text-blue-500"></span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className={`text-sm font-medium transition-colors hover:text-blue-400 ${activeSection === link.href.substring(1) ? 'text-blue-500' : 'text-slate-400'}`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X/> : <Menu/>}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        className="md:hidden absolute top-full left-0 w-full bg-slate-800 border-b border-slate-700 py-4 px-6 flex flex-col space-y-4 shadow-xl">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className="text-left text-slate-300 hover:text-blue-400 py-2"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* HERO SECTION */}
            <section id="home" className="relative z-10 min-h-screen flex items-center justify-center pt-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div
                        className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium animate-fade-in-up">
                        Available for opportunities
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight leading-tight animate-fade-in-up delay-100">
                        Software Engineer <br/> & <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Data Scientist</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
                        MSc @ UoE | 2+ Years Experience. Bridging the gap between robust software architecture and
                        advanced AI systems.
                    </p>
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                        {/*<button*/}
                        {/*    onClick={() => scrollToSection('#projects')}*/}
                        {/*    className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25"*/}
                        {/*>*/}
                        {/*    View Projects*/}
                        {/*</button>*/}
                        <button
                            onClick={() => scrollToSection('#experience')}
                            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25"
                        >
                            View Experience
                        </button>
                        <button
                            onClick={() => scrollToSection('#contact')}
                            className="w-full sm:w-auto px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-medium transition-all"
                        >
                            Contact Me
                        </button>
                    </div>

                    <div className="mt-20 flex justify-center animate-bounce text-slate-600">
                        <ChevronDown/>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-24 relative z-10">
                <div className="max-w-4xl mx-auto px-6">
                    <SectionTitle title="About Me" subtitle/>
                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 md:p-12">
                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            I am a <strong className="text-blue-400">Software Engineer with over two years of commercial
                            experience</strong>, currently expanding my expertise into Data Science. My professional
                            focus is on bridging the gap between robust software architecture and advanced data
                            analytics.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            Prior to my current postgraduate studies at the <strong className="text-purple-400">University
                            of Edinburgh</strong>, I specialized in building scalable full-stack applications using
                            Spring Boot and Angular. I progressed from a Software Intern to a full-time Software
                            Engineer, taking ownership of client-facing solutions that automated core business
                            operations.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            Today, I combine my engineering discipline with statistical depth to solve complex data
                            problems, with technical proficiency in <strong className="text-blue-400">Java, Python,
                            Spring Boot, and Machine Learning</strong>.
                        </p>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="py-24 bg-slate-900/50 relative z-10">
                <div className="max-w-5xl mx-auto px-6">
                    <SectionTitle title="Experience" subtitle/>
                    <div className="relative border-l border-slate-700 ml-4 md:ml-6 space-y-12">
                        {EXPERIENCE.map((exp) => (
                            <div key={exp.id} className="relative pl-8 md:pl-12 group">
                                {/* Timeline Dot */}
                                <div
                                    className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                    <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                                    <span className="text-sm font-mono text-slate-500">{exp.period}</span>
                                </div>
                                <div
                                    className="text-blue-400 font-medium mb-4">{exp.company} &middot; {exp.location}</div>

                                <ul className="list-disc list-outside ml-4 text-slate-400 space-y-2 mb-4">
                                    {exp.description.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map(t => (
                                        <Badge key={t} text={t} color="blue"/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="py-24 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionTitle title="Technical Skills" subtitle/>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SKILLS.map((group) => (
                            <Card key={group.category} className="h-full">
                                <div className="flex items-center gap-3 mb-4 text-blue-400">
                                    {group.icon}
                                    <h3 className="font-bold text-slate-200">{group.category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map(skill => (
                                        <span key={skill}
                                              className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                      {skill}
                    </span>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="py-24 bg-slate-900/50 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionTitle title="Featured Projects" subtitle/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {PROJECTS.map((project) => (
                            <Card key={project.id} className="group cursor-default">
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
                                        {project.category.includes('Data') ? <Brain/> : <Terminal/>}
                                    </div>
                                    <div className="flex gap-2">
                                        {/* Placeholder for links if you have them later */}
                                        {project.github ? <Github
                                            className="w-5 h-5 text-slate-600 hover:text-slate-300 cursor-pointer"/> : null}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-slate-400 mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="mt-auto flex flex-wrap gap-2">
                                    {project.tech.map(t => (
                                        <Badge key={t} text={t} color="purple"/>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* EDUCATION & CERTS */}
            <section id="education" className="py-24 relative z-10">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Education Column */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <GraduationCap className="text-blue-500"/>
                                <h2 className="text-2xl font-bold text-slate-100">Education</h2>
                            </div>
                            <div className="space-y-8 border-l-2 border-slate-700 ml-3 pl-8">
                                {EDUCATION.map((edu) => (
                                    <div key={edu.id} className="relative">
                                        <div
                                            className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-slate-900 bg-slate-600"></div>
                                        <h3 className="text-lg font-bold text-slate-200">{edu.degree}</h3>
                                        <p className="text-blue-400 text-sm mb-2">{edu.school}</p>
                                        <p className="text-slate-500 text-xs mb-3 font-mono">{edu.period}</p>
                                        <p className="text-slate-400 text-sm">{edu.details}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications Column */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Award className="text-purple-500"/>
                                <h2 className="text-2xl font-bold text-slate-100">Certifications</h2>
                            </div>
                            <div className="space-y-4">
                                {CERTIFICATIONS.map((cert, idx) => (
                                    <div key={idx}
                                         className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
                                        <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-purple-500"></div>
                                        <span className="text-slate-300 text-sm">{cert}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Volunteering Mini Section */}
                            <div className="mt-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <User className="text-emerald-500"/>
                                    <h2 className="text-2xl font-bold text-slate-100">Leadership</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
                                        <h4 className="text-slate-200 font-bold text-sm">Secretary & Core Leader</h4>
                                        <p className="text-emerald-400 text-xs mb-1">UCCDA (Technical Society)</p>
                                        <p className="text-slate-400 text-xs">Guided incoming leadership and ensured
                                            operational continuity for technical fests.</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
                                        <h4 className="text-slate-200 font-bold text-sm">Session Head</h4>
                                        <p className="text-emerald-400 text-xs mb-1">MANAN (Coding Society)</p>
                                        <p className="text-slate-400 text-xs">Conducted coding sessions (DSA/OOP) and
                                            mentored juniors.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-24 bg-slate-900 relative z-10 border-t border-slate-800">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <SectionTitle title="Get In Touch" subtitle/>
                    <p className="text-slate-400 mb-10 text-lg">
                        I am currently looking for <strong className="text-blue-400">Machine Learning
                        Engineer</strong> and <strong className="text-blue-400">Software Engineer</strong> roles.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a href="mailto:vivek.agg.va21@gmail.com"
                           className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all font-medium">
                            <Mail className="w-5 h-5"/>
                            Say Hello
                        </a>
                        <a href="https://www.linkedin.com/in/vivek1401" target="_blank" rel="noreferrer"
                           className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg transition-all font-medium">
                            <Linkedin className="w-5 h-5"/>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 bg-slate-950 text-center border-t border-slate-900">
                <div className="text-slate-500 text-sm">
                    <p className="mb-2">Designed & Built by Vivek Aggarwal</p>
                    <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}
