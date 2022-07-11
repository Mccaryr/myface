import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type userSliceState = {
    uid: string;
    signedIn: boolean;
}

const initialState: userSliceState = {
    uid: '',
    signedIn: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    saveUser: (state, action: PayloadAction<string>) => {
        state.uid = action.payload;
        state.signedIn = true;
    },

    logoutUser: (state) => {
        state.signedIn = false;
        state.uid = ''
        sessionStorage.setItem('uid', '')
    }
  }
});

export const {saveUser, logoutUser} = userSlice.actions

export default userSlice.reducer