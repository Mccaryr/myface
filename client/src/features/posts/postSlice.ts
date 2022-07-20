import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../models/PostModel';

interface PostSliceState {
 postArray: Post[]; 
}

const initialState: PostSliceState = {
  postArray: []
}

const postSlice = createSlice({
  name: 'posts',
  initialState,


  reducers: {
    getCurrentPostState: (state, action: any) => {
      state.postArray = []
      state.postArray = action.payload.posts
    },
    addPost: (state, action: PayloadAction<Post>) => {
        state.postArray.push(action.payload);
    }
  }
});

export const {addPost, getCurrentPostState} = postSlice.actions

export default postSlice.reducer