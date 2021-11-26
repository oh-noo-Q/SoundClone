import { createSlice } from "@reduxjs/toolkit";

const userSongsSlice = createSlice({
    name: 'userSongs',
    initialState: {
        userSongs:[
            {
                title: '',
                genre: '',
                urlAudio: '',
                user: {
                    fullname: '',
                }
            }
        ]
    },
    reducers: {
        changeUserSongs: (state, action) => {
            while (state.userSongs.length > 0) {
                state.userSongs.pop();
            }
            action.payload.forEach(item => {
                state.userSongs.push(item);
            });
        },
        removeUserSongs: (state, action) => {
            while (state.userSongs.length > 0) {
                state.userSongs.pop();
            }
        },
    }
});

const userSongsReducer = userSongsSlice.reducer;

export const userSongsSelector = state => state.userSongsReducer.userSongs;

export const { changeUserSongs, removeUserSongs } = userSongsSlice.actions;

export default userSongsReducer;