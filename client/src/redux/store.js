import { configureStore } from '@reduxjs/toolkit';
import dataSongsReducer from './reducers/dataSongsReducer';
import userSongsReducer from './reducers/userSongsReducer';

// store
const store = configureStore({
    reducer: {
        dataSongsReducer,
        userSongsReducer,
    }
});

// export
export default store;