import { RootState } from 'store';
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectIsWindowOpen = (state: RootState) => state.auth.isWindowOpen;
export const selectIsClientError = (state: RootState) => state.auth.clientError;
export const selectIsServerError = (state: RootState) => state.auth.serverError;
export const selectIsNewUser = (state: RootState) => state.auth.newUser;
export const selectIsRestorePass = (state: RootState) => state.auth.restorePassword;
