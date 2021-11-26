import { configureStore } from '@reduxjs/toolkit';
import dataSongsReducer from './reducers/dataSongsReducer';
import dataSearchReducer from './reducers/searchDataReducer';
import userSongsReducer from './reducers/userSongsReducer';


// store
const store = configureStore({
    reducer: {
        dataSongsReducer,
        userSongsReducer,
        dataSearchReducer,
    }
});

// export
export default store;