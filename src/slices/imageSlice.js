import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageURL: "",
  loading: false,
  error: ""
};

export const fetchImage = createAsyncThunk(
  'data/fetchImage',
  async (endpoint) => {
    const response = await fetch(endpoint, { headers : {"qg-token": "oGmaaQ"}});
    return response.json();
  }
);

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.loading = false;
        state.imageURL = action.payload.image;
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;
