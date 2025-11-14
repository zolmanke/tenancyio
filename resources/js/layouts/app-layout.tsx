import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

interface PageProps {
    [key: string]: any;
    auth: {
        user: {
            id: number;
            email: string;
            email_verified_at: string | null;
        } | null;
    };
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage<PageProps>().props;

    useEffect(() => {
        // Check if user is authenticated but not verified
        if (auth.user && !auth.user.email_verified_at) {
            const currentPath = window.location.pathname;
            const allowedPaths = [
                '/email/verify',
                '/logout',
                '/email/verification-notification'
            ];
            
            // If user is trying to access a protected route without verification
            const isProtectedRoute = !allowedPaths.some(path => 
                currentPath.startsWith(path)
            );
            
            if (isProtectedRoute) {
                // Redirect to verification notice
                // Try to use the global `route` helper (e.g. Ziggy) if available, otherwise fall back to a known path.
                const verificationUrl = typeof (window as any).route === 'function'
                    ? (window as any).route('verification.notice')
                    : '/email/verify';
                window.location.href = verificationUrl;
            }
        }
    }, [auth.user]);

    // Don't render the app layout if user is not verified and on a protected route
    if (auth.user && !auth.user.email_verified_at) {
        const currentPath = window.location.pathname;
        const allowedPaths = [
            '/email/verify',
            '/logout', 
            '/email/verification-notification'
        ];
        
        const shouldShowLayout = allowedPaths.some(path => 
            currentPath.startsWith(path)
        );
        
        if (!shouldShowLayout) {
            // Return null or a loading state while redirecting
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="spinner"></div>
                        <p className="mt-4 text-muted-foreground">Redirecting...</p>
                    </div>
                </div>
            );
        }
    }

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
};