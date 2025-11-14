import Auth from './Auth'
import DashboardController from './DashboardController'
import TenantDashboardController from './TenantDashboardController'
import MaintenanceRequestController from './MaintenanceRequestController'
import PropertyController from './PropertyController'
import HouseAssignmentController from './HouseAssignmentController'
import HouseController from './HouseController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
DashboardController: Object.assign(DashboardController, DashboardController),
TenantDashboardController: Object.assign(TenantDashboardController, TenantDashboardController),
MaintenanceRequestController: Object.assign(MaintenanceRequestController, MaintenanceRequestController),
PropertyController: Object.assign(PropertyController, PropertyController),
HouseAssignmentController: Object.assign(HouseAssignmentController, HouseAssignmentController),
HouseController: Object.assign(HouseController, HouseController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers