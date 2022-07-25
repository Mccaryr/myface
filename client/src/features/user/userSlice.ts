import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type userSliceState = {
    uid: string;
    signedIn: boolean;
    userDetails: User;
}

interface User {
  user_id: string;
  profile_url: string;
  first_name: string;
  last_name: string;

}

const initialState: userSliceState = {
    uid: '',
    signedIn: false,
    userDetails: {
      first_name: "",
      last_name: "",
      user_id: "",
      profile_url: ""
    }
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
      let profile_url = action.payload.user.profile_url
      sessionStorage.setItem('profile_url', profile_url)
      sessionStorage.setItem('userInfo', JSON.stringify(action.payload.user))
      state.userDetails = {...action.payload.user}
      
      
       
  },

    logoutUser: (state) => {
        state.signedIn = false;
        state.uid = ''
        sessionStorage.removeItem('uid')
        sessionStorage.removeItem('profile_url')
        sessionStorage.removeItem('userInfo')
    }
  }
});

export const {saveUser, logoutUser, saveUserDetails} = userSlice.actions

export default userSlice.reducer