
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import UserProfile from './components/UserDashboard/UserProfile';
import ServiceSearch from './components/UserDashboard/ServiceSearch';
import CommunityForum from './components/UserDashboard/CommunityForum';
import AdminProfile from './components/AdminDashboard/AdminProfile';
import ManageProviders from './components/AdminDashboard/ManageProviders';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/user/profile" component={UserProfile} />
                <Route path="/user/service-search" component={ServiceSearch} />
                <Route path="/user/forum" component={CommunityForum} />
                <Route path="/admin/profile" component={AdminProfile} />
                <Route path="/admin/manage-providers" component={ManageProviders} />
                {/* Add other routes as necessary */}
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
