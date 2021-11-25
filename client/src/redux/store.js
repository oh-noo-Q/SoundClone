import { configureStore } from '@reduxjs/toolkit';
import dataSongsReducer from './reducers/dataSongsReducer';

// store
const store = configureStore({
    reducer: {
        dataSongsReducer,
    }
});

// export
export default store;