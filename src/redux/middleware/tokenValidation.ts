import { Middleware } from 'redux';
import {signOut} from "../slices/auth-slice"

const tokenValidationMiddleware: Middleware = store => next => action => {
    const tokenExpiration = () => {
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        if (tokenExpiry && Number(tokenExpiry) < Date.now()) {
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiry');
            // Dispatch action to clear authentication state
            store.dispatch(signOut());
    
            //Optional: Redirect to Auth
            window.location.href = '/login';
        }
    };
    tokenExpiration();
    
    return next(action);
};

export default tokenValidationMiddleware;
