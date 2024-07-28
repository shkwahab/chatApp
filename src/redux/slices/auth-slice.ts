import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, User } from "../../apis/types";

const getLocalStorageItem = (key: string, defaultValue: any) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Failed to parse ${key} from localStorage`, error);
        return defaultValue;
    }
};

const initialState: Auth = {
    isLogin: false,
    user: null,
    token: getLocalStorageItem("token", null),
    tokenExpiry: getLocalStorageItem("tokenExpiry", null)
};

const authSlice = createSlice({
    name: "authCtx",
    initialState,
    reducers: {
        login(state: Auth, action: PayloadAction<Auth>) {
            const { user, token, tokenExpiry, isLogin } = action.payload;
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("tokenExpiry", JSON.stringify(tokenExpiry));
            state.user = user;
            state.token = token;
            state.tokenExpiry = tokenExpiry;
            state.isLogin = isLogin;
        },
        signOut(state: Auth) {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiry");
            state.isLogin = false;
            state.user = null;
            state.token = null;
            state.tokenExpiry = null;
        }
    }
});

export const { login, signOut } = authSlice.actions;

export default authSlice.reducer;
