import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import usersReducer from './users';
import configReducer from './config';
import boardReducer from './boards';
import userReducer from './user';

const reducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    config: configReducer,
    boards: boardReducer,
    user: userReducer,
});

const store = configureStore({ reducer });

export default store;