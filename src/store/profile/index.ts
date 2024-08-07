import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  profileToken: string | undefined,
}

const initialState: IInitialState = {profileToken: undefined};

export const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setProfileToken: (state, action) => {
      state.profileToken= action.payload;
    },
  },
});

export const {setProfileToken} = ProfileSlice.actions;

export default ProfileSlice.reducer;
