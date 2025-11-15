import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
import { useState, useEffect } from 'react';
import { 
  FaHome, 
  FaUsers, 
  FaCreditCard, 
  FaTools,
  FaChartBar,
  FaBell,
  FaMobile,
  FaStar,
  FaUserTie,
  FaUser,
  FaApple,
  FaAndroid,
  FaPlay,
  FaBuilding,
  FaShieldAlt,
  FaRocket,
  FaHeart
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
            title: "Smart Property Management",
            description: "Manage all your properties in one place with real-time updates and automated workflows.",
            icon: <FaHome className="text-4xl" />
        },
        {
            title: "Tenant Portal",
            description: "Give tenants easy access to maintenance requests, payments, and communication.",
            icon: <FaUsers className="text-4xl" />
        },
        {
            title: "Automated Payments",
            description: "Streamline rent collection with secure, automated payment processing.",
            icon: <FaCreditCard className="text-4xl" />
        },
        {
            title: "Maintenance Tracking",
            description: "Track and manage maintenance requests from submission to completion.",
            icon: <FaTools className="text-4xl" />
        }
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
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black font-sans">
                {/* Navigation */}
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#590202] to-[#820303] rounded-lg flex items-center justify-center">
                                <FaBuilding className="text-white text-sm" />
                            </div>
                            <span className="text-2xl font-bold text-gray-800 dark:text-white">tenancy</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="bg-[#590202] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#820303] transition-colors"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-gray-600 dark:text-gray-300 text-sm hover:text-[#590202] dark:hover:text-[#820303] font-medium transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="bg-[#590202] text-white text-sm px-6 py-2 rounded-lg font-medium hover:bg-[#820303] transition-colors"
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
<section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 mt-12 sm:mt-10">
            Smart Property Management
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#590202] to-[#820303]">
                Made Simple
            </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Streamline your property management with our all-in-one platform. 
            Manage tenants, payments, maintenance, and more from anywhere.
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
<div className="max-w-7xl mx-auto px-4">
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {features.map((feature, index) => (
            <div 
                key={index}
                className="inline-flex items-center bg-gradient-to-r from-[#590202]/5 to-[#820303]/5 dark:from-[#590202]/10 dark:to-[#820303]/10 backdrop-blur-sm rounded-full px-2.5 py-1 border border-[#590202]/10 dark:border-[#820303]/20 shadow-xs hover:shadow-sm transition-all duration-200"
            >
                <div className="text-[#590202] dark:text-[#820303] mr-1.5 flex-shrink-0">
                    {React.cloneElement(feature.icon, { className: "text-xs" })}
                </div>
                <span className="text-sm font-light text-gray-600 dark:text-gray-400 whitespace-nowrap">
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
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
            {
                icon: <FaChartBar className="text-3xl" />,
                title: "Real-time Analytics",
                description: "Track performance with detailed reports and insights"
            },
            {
                icon: <FaCreditCard className="text-3xl" />,
                title: "Automated Rent Collection",
                description: "Set up recurring payments and reduce late payments"
            },
            {
                icon: <FaBell className="text-3xl" />,
                title: "Instant Notifications",
                description: "Stay updated with real-time alerts and notifications"
            },
            {
                icon: <FaMobile className="text-3xl" />,
                title: "Mobile First",
                description: "Manage everything on the go with our mobile app"
            }
        ].map((feature, index) => (
            <div 
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1"
            >
                <div className="text-[#590202] mb-4">
                    {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                </p>
            </div>
        ))}
    </div>
</section>



{/* App Download Section */}
<section className="bg-gradient-to-r from-[#590202] to-[#820303] text-white py-16">
    <div className="container mx-auto px-6 text-center">
        {/* Title with Coming Soon Ribbon */}
        <div className="relative inline-block mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">
                Download Our Mobile App
            </h2>
            {/* Coming Soon Ribbon */}
            <div className="absolute -top-3 -right-8 bg-yellow-500 text-black px-4 py-1 text-sm font-bold rounded-full shadow-lg rotate-12">
                COMING SOON
            </div>
        </div>
        
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Manage your properties on the go with our feature-packed mobile application. 
            Available on both iOS and Android platforms.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Play Store Button */}
            <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-3 shadow-lg">
                <FaAndroid className="text-2xl" />
                <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold">Google Play</div>
                </div>
            </button>

            {/* App Store Button */}
            <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-3 shadow-lg">
                <FaApple className="text-2xl" />
                <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
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
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
                        Trusted by Property Managers
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Kimani",
                                role: "Property Manager",
                                content: "Tenancy has revolutionized how we manage our 50+ properties. The automation features save us hours every week.",
                                avatar: <FaUserTie className="text-2xl" />
                            },
                            {
                                name: "Samson Kinyua",
                                role: "Real Estate Investor",
                                content: "The tenant portal and payment system alone are worth it. My tenants love the convenience.",
                                avatar: <FaUser className="text-2xl" />
                            },
                            {
                                name: "Lameck Omwamba",
                                role: "Landlord",
                                content: "As a small landlord, this platform gives me enterprise-level tools at an affordable price.",
                                avatar: <FaUser className="text-2xl" />
                            }
                        ].map((testimonial, index) => (
                            <div 
                                key={index}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="text-[#590202] mr-4">
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
                                <p className="text-gray-600 dark:text-gray-300 italic">
                                    "{testimonial.content}"
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-6 py-16 text-center">
                    <div className="bg-gradient-to-r from-[#590202] to-[#820303] rounded-3xl p-12 text-white max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Transform Your Property Management?
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of property managers who are already saving time and increasing efficiency.
                        </p>
                        {!auth.user && canRegister ? (
                            <Link
                                href={register()}
                                className="bg-white text-[#590202] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
                            >
                                Start Your Free Trial Today
                            </Link>
                        ) : auth.user ? (
                            <Link
                                href={dashboard()}
                                className="bg-white text-[#590202] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="bg-white text-[#590202] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
                            >
                                Sign In to Your Account
                            </Link>
                        )}
                        
                        <div className="mt-6 text-white/80 text-sm">
                            No credit card required • 14-day free trial • Cancel anytime
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-200 dark:bg-gray-800 py-12">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-[#590202] to-[#820303] rounded-lg flex items-center justify-center">
                                        <FaBuilding className="text-white text-sm" />
                                    </div>
                                    <span className="text-lg font-bold text-[#590202] dark:text-[#820303]">tenancy</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Streamlining property management for landlords and property managers worldwide.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-4 text-[#590202] dark:text-[#820303]">Product</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Features</a></li>
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Pricing</a></li>
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Mobile App</a></li>
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Integrations</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-4 text-[#590202] dark:text-[#820303]">Company</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">About</a></li>
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Blog</a></li>
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Careers</a></li>
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Contact</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-4 text-[#590202] dark:text-[#820303]">Support</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Help Center</a></li>
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Documentation</a></li>
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Community</a></li>
                                    <li><a href="#" className="hover:text-[#590202] dark:hover:text-[#820303] transition-colors">Status</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                            <p>&copy; 2025 tenancy. All rights reserved. Made with <FaHeart className="inline text-[#590202] mx-1" /> for property managers</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}