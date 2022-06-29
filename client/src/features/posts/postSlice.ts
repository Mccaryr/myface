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
    createPost: (state, action: PayloadAction<Post>) => {
        state.postArray.push(action.payload);
    }
  }
});

export const {createPost} = postSlice.actions

export default postSlice.reducer