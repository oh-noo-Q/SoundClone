import { createSlice } from '@reduxjs/toolkit';

const dataSearchSlice = createSlice({
    name: 'dataSearch',
    initialState: {
        dataSearch: [
            {
                title: "",
                genre: "",
                urlAudio: "",
                user: {
                    fullname: "",
                }
            }
        ]
    },
    reducers: {
        changeDataSearch: (state, action) => {
            while (state.dataSearch.length > 0) {
                state.dataSearch.pop();
            }
            action.payload.forEach(item => {
                state.dataSearch.push(item);
            });
        }
    }
});

// reducer
const dataSearchReducer = dataSearchSlice.reducer;

// selector
export const dataSeachSelector = state => state.dataSearchReducer.dataSearch;

// export action
export const { changeDataSearch } = dataSearchSlice.actions;

// export reducer
export default dataSearchReducer;