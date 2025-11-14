import { FaBuilding } from 'react-icons/fa';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
  <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#590202] to-[#820303] rounded-lg flex items-center justify-center">
                                <FaBuilding className="text-white text-sm" />
                            </div>
                        </div>            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 text-xl truncate leading-tight font-bold">
                    tenancy
                </span>
            </div>
        </>
    );
}