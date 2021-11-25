import { createSlice } from '@reduxjs/toolkit';

const dataSongsSlice = createSlice({
    name: 'dataSongs',
    initialState: {
        dataSongs: [
            {
                title: "Pho khong em - Thai Dinh",
                genre: "indie",
                urlAudio: "https://firebasestorage.googleapis.com/v0/b/sound-clone.appspot.com/o/songs%2Fpho_khong_em.mp3?alt=media&token=691e9024-ecb5-4521-995a-4034a8b95662",
                user: {
                    fullname: "Admin Phong Quyet",
                }
            }
        ]
    },
    reducers: {
        changeDataSongs: (state, action) => {
            while (state.dataSongs.length > 0) {
                state.dataSongs.pop();
            }
            action.payload.forEach(item => {
                state.dataSongs.unshift(item);
            });
        }
    }
});

// reducer
const dataSongsReducer = dataSongsSlice.reducer;

// selector
export const dataSongsSelector = state => state.dataSongsReducer.dataSongs;

// export action
export const { changeDataSongs } = dataSongsSlice.actions;

// export reducer
export default dataSongsReducer;