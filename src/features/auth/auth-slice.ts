import { createSlice } from '@reduxjs/toolkit';

export interface IAuth {
    isAuth: boolean;
    isWindowOpen: boolean;
    newUser: boolean;
    restorePassword: boolean;
    clientError: boolean;
    serverError: boolean;
}
const initialState: IAuth = {
    isAuth: false,
    isWindowOpen: false,
    newUser: false,
    restorePassword: false,
    clientError: false,
    serverError: false,
};
const AuthSlice = createSlice({
    name: '@@auth',
    initialState: initialState,
    reducers: {
        changeAuthStatus: (state, action) => {
            state.clientError = false;
            state.isAuth = true;
        },
        changeWindowOpen: (state, action) => {
            state.isWindowOpen = action.payload;
        },
        registrateNewUser: (state, action) => {
            state.newUser = action.payload;
        },
        restorePassword: (state, action) => {
            state.restorePassword = action.payload;
        },
        changeErrorStatus: (state, action) => {
            switch (action.payload.error) {
                case 200:
                    state.serverError = false;
                    state.clientError = false;
                    break;
                case 400:
                    state.clientError = true;
                    break;
                case 500:
                    state.serverError = true;
                    break;
                default:
                    return;
            }
        },
        discardChanges: (state, action) => {
            state.isAuth = false;
            state.isWindowOpen = false;
            state.newUser = false;
            state.restorePassword = false;
            state.clientError = false;
            state.serverError = false;
        },
    },
});
export const AuthReducer = AuthSlice.reducer;
export const { changeAuthStatus, changeWindowOpen, changeErrorStatus, registrateNewUser, restorePassword, discardChanges } =
    AuthSlice.actions;
