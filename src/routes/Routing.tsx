import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import Route instead of Router
import Home from '../pages/Chat/Home';
import Login from '../pages/Authentication/signIn';
import ProtectedRoutes from '../utils/ProtectedRoutes';
const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/login" element={<ProtectedRoutes> <Login /></ProtectedRoutes>} />
                    <Route path="/" element={<ProtectedRoutes> <Home /> </ProtectedRoutes>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
