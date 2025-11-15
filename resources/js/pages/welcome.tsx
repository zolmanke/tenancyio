import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import {
    FaAndroid,
    FaApple,
    FaBell,
    FaBuilding,
    FaChartBar,
    FaCreditCard,
    FaHeart,
    FaHome,
    FaMobile,
    FaTools,
    FaUser,
    FaUsers,
    FaUserTie,
} from 'react-icons/fa';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [currentFeature, setCurrentFeature] = useState(0);

    const features = [
        {
            title: 'Smart Property Management',
            description:
                'Manage all your properties in one place with real-time updates and automated workflows.',
            icon: <FaHome className="text-4xl" />,
        },
        {
            title: 'Tenant Portal',
            description:
                'Give tenants easy access to maintenance requests, payments, and communication.',
            icon: <FaUsers className="text-4xl" />,
        },
        {
            title: 'Automated Payments',
            description:
                'Streamline rent collection with secure, automated payment processing.',
            icon: <FaCreditCard className="text-4xl" />,
        },
        {
            title: 'Maintenance Tracking',
            description:
                'Track and manage maintenance requests from submission to completion.',
            icon: <FaTools className="text-4xl" />,
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="Welcome to Tenancy - Smart Property Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans dark:from-black dark:to-black">
                {/* Navigation */}
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#590202] to-[#820303]">
                                <FaBuilding className="text-sm text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-800 dark:text-white">
                                tenancy
                            </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-[#590202] px-6 py-2 font-medium text-white transition-colors hover:bg-[#820303]"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm font-medium text-gray-600 transition-colors hover:text-[#590202] dark:text-gray-300 dark:hover:text-[#820303]"
                                    >
                                        Sign In
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-lg bg-[#590202] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#820303]"
                                        >
                                            Get Started Free
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
                    <div className="text-center">
                        <h1 className="mt-12 mb-4 text-4xl font-bold text-gray-800 sm:mt-10 sm:mb-6 sm:text-5xl md:text-6xl dark:text-white">
                            Smart Property Management
                            <span className="mt-4 block bg-gradient-to-r from-[#590202] to-[#820303] bg-clip-text text-transparent">
                                Made Simple
                            </span>
                        </h1>

                        <p className="mx-auto mb-6 max-w-2xl px-4 text-lg text-gray-600 sm:mb-8 sm:text-xl dark:text-gray-300">
                            Streamline your property management with our
                            all-in-one platform. Manage tenants, payments,
                            maintenance, and more from anywhere.
                        </p>

                        {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            {!auth.user && canRegister && (
                <Link
                    href={register()}
                    className="bg-gradient-to-r from-[#590202] to-[#820303] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-colors shadow-lg w-full sm:w-auto text-center"
                >
                    Start Free Trial
                </Link>
            )}
            <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:border-[#590202] transition-colors w-full sm:w-auto">
                Watch Demo
            </button>
        </div> */}

                        {/* Feature Notes - Very Small with Text */}
                        <div className="mx-auto max-w-7xl px-4">
                            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="inline-flex items-center rounded-full border border-[#590202]/10 bg-gradient-to-r from-[#590202]/5 to-[#820303]/5 px-2.5 py-1 shadow-xs backdrop-blur-sm transition-all duration-200 hover:shadow-sm dark:border-[#820303]/20 dark:from-[#590202]/10 dark:to-[#820303]/10"
                                    >
                                        <div className="mr-1.5 flex-shrink-0 text-[#590202] dark:text-[#820303]">
                                            {React.cloneElement(feature.icon, {
                                                className: 'text-xs',
                                            })}
                                        </div>
                                        <span className="text-sm font-light whitespace-nowrap text-gray-600 dark:text-gray-400">
                                            {feature.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="container mx-auto px-6 py-16">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: <FaChartBar className="text-3xl" />,
                                title: 'Real-time Analytics',
                                description:
                                    'Track performance with detailed reports and insights',
                            },
                            {
                                icon: <FaCreditCard className="text-3xl" />,
                                title: 'Automated Rent Collection',
                                description:
                                    'Set up recurring payments and reduce late payments',
                            },
                            {
                                icon: <FaBell className="text-3xl" />,
                                title: 'Instant Notifications',
                                description:
                                    'Stay updated with real-time alerts and notifications',
                            },
                            {
                                icon: <FaMobile className="text-3xl" />,
                                title: 'Mobile First',
                                description:
                                    'Manage everything on the go with our mobile app',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-200 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/70"
                            >
                                <div className="mb-4 text-[#590202]">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* App Download Section */}
                <section className="bg-gradient-to-r from-[#590202] to-[#820303] py-16 text-white">
                    <div className="container mx-auto px-6 text-center">
                        {/* Title with Coming Soon Ribbon */}
                        <div className="relative mb-4 inline-block">
                            <h2 className="text-3xl font-bold md:text-4xl">
                                Download Our Mobile App
                            </h2>
                            {/* Coming Soon Ribbon */}
                            <div className="absolute -top-3 -right-8 rotate-12 rounded-full bg-yellow-500 px-4 py-1 text-sm font-bold text-black shadow-lg">
                                COMING SOON
                            </div>
                        </div>

                        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                            Manage your properties on the go with our
                            feature-packed mobile application. Available on both
                            iOS and Android platforms.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            {/* Play Store Button */}
                            <button className="flex items-center space-x-3 rounded-lg bg-black px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-gray-900">
                                <FaAndroid className="text-2xl" />
                                <div className="text-left">
                                    <div className="text-xs">GET IT ON</div>
                                    <div className="text-lg font-semibold">
                                        Google Play
                                    </div>
                                </div>
                            </button>

                            {/* App Store Button */}
                            <button className="flex items-center space-x-3 rounded-lg bg-black px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-gray-900">
                                <FaApple className="text-2xl" />
                                <div className="text-left">
                                    <div className="text-xs">
                                        Download on the
                                    </div>
                                    <div className="text-lg font-semibold">
                                        App Store
                                    </div>
                                </div>
                            </button>
                        </div>

                        {/* <div className="mt-8 flex justify-center space-x-8 text-white">
            <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center">
                    4.8 <FaStar className="ml-1 text-yellow-400" />
                </div>
                <div className="text-sm">App Store Rating</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm">Active Users</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm">Uptime</div>
            </div>
        </div> */}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="container mx-auto px-6 py-16">
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-white">
                        Trusted by Property Managers
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                name: 'Sarah Kimani',
                                role: 'Property Manager',
                                content:
                                    'Tenancy has revolutionized how we manage our 50+ properties. The automation features save us hours every week.',
                                avatar: <FaUserTie className="text-2xl" />,
                            },
                            {
                                name: 'Samson Kinyua',
                                role: 'Real Estate Investor',
                                content:
                                    'The tenant portal and payment system alone are worth it. My tenants love the convenience.',
                                avatar: <FaUser className="text-2xl" />,
                            },
                            {
                                name: 'Lameck Omwamba',
                                role: 'Landlord',
                                content:
                                    'As a small landlord, this platform gives me enterprise-level tools at an affordable price.',
                                avatar: <FaUser className="text-2xl" />,
                            },
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80"
                            >
                                <div className="mb-4 flex items-center">
                                    <div className="mr-4 text-[#590202]">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800 dark:text-white">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic dark:text-gray-300">
                                    "{testimonial.content}"
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-6 py-16 text-center">
                    <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-[#590202] to-[#820303] p-12 text-white">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Ready to Transform Your Property Management?
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                            Join thousands of property managers who are already
                            saving time and increasing efficiency.
                        </p>
                        {!auth.user && canRegister ? (
                            <Link
                                href={register()}
                                className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#590202] shadow-lg transition-colors hover:bg-gray-100"
                            >
                                Start Your Free Trial Today
                            </Link>
                        ) : auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#590202] shadow-lg transition-colors hover:bg-gray-100"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#590202] shadow-lg transition-colors hover:bg-gray-100"
                            >
                                Sign In to Your Account
                            </Link>
                        )}

                        <div className="mt-6 text-sm text-white/80">
                            No credit card required • 14-day free trial • Cancel
                            anytime
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-200 py-12 dark:bg-gray-800">
                    <div className="container mx-auto px-6">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div>
                                <div className="mb-4 flex items-center space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#590202] to-[#820303]">
                                        <FaBuilding className="text-sm text-white" />
                                    </div>
                                    <span className="text-lg font-bold text-[#590202] dark:text-[#820303]">
                                        tenancy
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Streamlining property management for
                                    landlords and property managers worldwide.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-4 font-semibold text-[#590202] dark:text-[#820303]">
                                    Product
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Features
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Pricing
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Mobile App
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Integrations
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-4 font-semibold text-[#590202] dark:text-[#820303]">
                                    Company
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Careers
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-4 font-semibold text-[#590202] dark:text-[#820303]">
                                    Support
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Help Center
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Community
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition-colors hover:text-[#590202] dark:hover:text-[#820303]"
                                        >
                                            Status
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-300 pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                            <p>
                                &copy; 2025 tenancy. All rights reserved. Made
                                with{' '}
                                <FaHeart className="mx-1 inline text-[#590202]" />{' '}
                                for property managers
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
