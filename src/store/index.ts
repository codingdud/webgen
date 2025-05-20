import {configureStore} from '@reduxjs/toolkit'
import uiReducer from './ui-slice';
import authReducer from './auth-slice';
import projectReducer from './project-slice';
import dashboardReducer from './dashboard-slice';
import userReducer from './user-slice';
import templateReducer from './template-slice';

const store=configureStore({
    reducer:{
        uiState:uiReducer,
        authState:authReducer,
        projectState:projectReducer,
        dashboardState:dashboardReducer,
        userState:userReducer,
        templateState:templateReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store