import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { FaHome, FaKey } from 'react-icons/fa';

export default function SetUserType() {
  const { data, setData, post, processing, errors } = useForm({
    user_type: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.user_type) {
      post('/set-user-type');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Join as...
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Select your role to customize your experience
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Landlord Button */}
            <button
              type="button"
              onClick={() => setData('user_type', 'Landlord')}
              className={`p-10 rounded-3xl border-1 transition-all duration-300 ${
                data.user_type === 'Landlord'
                  ? 'border-[#590202] bg-[#590202]/5 shadow-2xl scale-105'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:scale-102'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#590202] to-[#820303] text-white">
                  <FaHome className="text-5xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Landlord
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-base">
                  I own properties and want to manage tenants, payments, and maintenance
                </p>
              </div>
            </button>

            {/* Tenant Button */}
           <div className="relative">
  {/* Coming Soon Ribbon */}
  <div className="absolute -top-2 -right-2 bg-gray-500 text-white px-4 py-1 rounded-lg text-sm font-semibold z-10 rotate-12 shadow-lg">
    Coming Soon
  </div>
  
  <button
    type="button"
    onClick={() => {
      if (data.user_type !== 'Tenant') {
        setData('user_type', 'Tenant');
      }
    }}
    disabled
    className={`p-10 rounded-3xl border-1 transition-all duration-300 relative overflow-hidden ${
      data.user_type === 'Tenant'
        ? 'border-[#590202] bg-[#590202]/5 shadow-2xl scale-105'
        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg opacity-60 cursor-not-allowed'
    }`}
  >
    {/* Disabled Overlay */}
    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 opacity-20 z-0"></div>
    
    <div className="flex flex-col items-center text-center space-y-4 relative z-10">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-600 text-white">
        <FaKey className="text-5xl" />
      </div>
      <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-400">
        Tenant
      </h3>
      <p className="text-gray-400 dark:text-gray-500 text-base">
        I rent properties and need to pay rent, submit requests, and communicate
      </p>
    </div>
  </button>
</div>
          </div>

          {errors.user_type && (
            <div className="text-center mb-6">
              <p className="text-red-500 text-lg bg-red-50 dark:bg-red-900/20 py-3 px-6 rounded-xl">
                Please select a role to continue
              </p>
            </div>
          )}

          <div className="text-center">
            <Button
              type="submit"
              className="w-full max-w-md text-sm py-5 text-xl font-semibold"
              disabled={processing || !data.user_type}
              size="lg"
            >
              {processing ? 'Setting Up Your Account...' : `Continue as ${data.user_type}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}