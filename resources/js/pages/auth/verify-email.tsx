import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

interface VerifyEmailProps {
    status?: string;
}

export default function VerifyEmail({ status }: VerifyEmailProps) {
    const { post, processing } = useForm();

    const handleResendVerification = (e: React.FormEvent) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        post('/logout');
    };

    return (
        <AuthLayout
            title="Verify your email"
            description="We've sent a verification link to your email address"
        >
            <Head title="Email Verification" />
            
            <div className="flex flex-col gap-6">
                <div className="text-center">
                    <div className="mb-4 text-sm text-muted-foreground">
                        Thanks for signing up! 
                        Before getting started, could you verify your email 
                        address by clicking on the link we just emailed to you? If you didn't 
                        receive the email, we will gladly send you another.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            A new verification link has been sent to your email address.
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <form onSubmit={handleResendVerification}>
                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={processing}
                        >
                            {processing && <Spinner />}
                            Resend Verification Email
                        </Button>
                    </form>

                    <form onSubmit={handleLogout}>
                        <Button 
                            type="submit"
                            variant="outline"
                            className="w-full"
                        >
                            Log Out
                        </Button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}