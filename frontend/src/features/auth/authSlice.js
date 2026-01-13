// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { registerThunk, loginThunk, logoutThunk, fetchMe } from "./authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.checked = true; 
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.checked = true; 
      })
      /* ================= REGISTER ================= */
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= LOGIN ================= */
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= LOGOUT ================= */
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.checked = true;
      });
  },
});

export default authSlice.reducer;
