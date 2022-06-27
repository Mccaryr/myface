import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../models/PostModel';

type PostState = Post[]

const initialState: PostState = []

const postSlice = createSlice({
  name: 'posts',
  initialState,


  reducers: {
    createPost: (state, action: PayloadAction<Post>) => {
        state.push(action.payload);
    }
  }
});

export const {createPost} = postSlice.actions

export default postSlice.reducer