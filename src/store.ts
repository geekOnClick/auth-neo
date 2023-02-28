import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as api from '_config';
import { AuthReducer } from 'features/auth/auth-slice';
import { IRootState } from 'types/store';
import type { PreloadedState } from '@reduxjs/toolkit';

export const createStore = (preloadedState?: PreloadedState<IRootState>) =>
    configureStore({
        preloadedState: preloadedState,
        reducer: {
            auth: AuthReducer,
        },
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        client: axios,
                        api,
                    },
                },
                serializableCheck: false,
            }),
    });
export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppStore = typeof store;
