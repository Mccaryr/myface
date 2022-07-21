import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type userSliceState = {
    uid: string;
    signedIn: boolean;
    userDetails: object;
}

const initialState: userSliceState = {
    uid: '',
    signedIn: false,
    userDetails: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    saveUser: (state, action: PayloadAction<string>) => {
        state.uid = JSON.parse(action.payload);
        if(state.uid) {
          state.signedIn = true;
        }
        
         
    },

    saveUserDetails: (state, action: PayloadAction<any>) => {
      let profile_url = action.payload.user.profile_image
      sessionStorage.setItem('profile_url', profile_url)
      state.userDetails = action.payload.user
      
       
  },

    logoutUser: (state) => {
        state.signedIn = false;
        state.uid = ''
        sessionStorage.removeItem('uid')
        sessionStorage.removeItem('profile_url')
    }
  }
});

export const {saveUser, logoutUser, saveUserDetails} = userSlice.actions

export default userSlice.reducer