import { Routes, Route } from 'react-router-dom';
import ProviderProfile from '../ProviderDashboard/ProviderProfile';
import AvailabilityManagement from '../ProviderDashboard/AvailabilityManagement';
import RespondToRequests from '../ProviderDashboard/RespondToRequests';
import Reviews from '../ProviderDashboard/Reviews';
import EarningsReport from '../ProviderDashboard/EarningsReport';
import SmartNotifications from '../ProviderDashboard/SmartNotifications';

const ProviderDashboard = () => {
    return (
        <div>
            <Routes>
                <Route path="profile" element={<ProviderProfile />} />
                <Route path="availability-management" element={<AvailabilityManagement />} />
                <Route path="respond-to-requests" element={<RespondToRequests />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="earnings-report" element={<EarningsReport />} />
                <Route path="notifications" element={<SmartNotifications />} />
            </Routes>
        </div>
    );
};

export default ProviderDashboard;
