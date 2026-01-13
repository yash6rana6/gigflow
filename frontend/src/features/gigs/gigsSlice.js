// src/features/gigs/gigsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchGigs, fetchGigById, createGig, fetchMyGigs } from "./gigsThunks";

const gigsSlice = createSlice({
  name: "gigs",
  initialState: {
    gigs: [],
    currentGig: null,
    myGigs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ================= FETCH ALL GIGS ================= */
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH SINGLE GIG ================= */
      .addCase(fetchGigById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGigById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGig = action.payload;
      })
      .addCase(fetchGigById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= CREATE GIG ================= */
      .addCase(createGig.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs.unshift(action.payload); // latest gig on top
      })
      .addCase(createGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.myGigs = action.payload;
      })
      .addCase(fetchMyGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gigsSlice.reducer;
