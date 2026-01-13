// src/features/bids/bidsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createBid, fetchBidsByGig, fetchMyBids, hireBid } from "./bidsThunks";

const bidsSlice = createSlice({
  name: "bids",
  initialState: {
    bids: [],
    mybids: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBids: (state) => {
      state.bids = [];
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= FETCH BIDS ================= */
      .addCase(fetchBidsByGig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBidsByGig.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload;
      })
      .addCase(fetchBidsByGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= CREATE BID ================= */
      .addCase(createBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.loading = false;
        state.bids.unshift(action.payload);
      })
      .addCase(createBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= HIRE BID ================= */
      .addCase(hireBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(hireBid.fulfilled, (state, action) => {
        state.loading = false;

        const hiredId = action.payload.bidId;

        state.bids = state.bids.map((bid) => {
          if (bid._id === hiredId) {
            return { ...bid, status: "hired" };
          }
          return { ...bid, status: "rejected" };
        });
      })
      .addCase(hireBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids = action.payload;
      })
      .addCase(fetchMyBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBids } = bidsSlice.actions;
export default bidsSlice.reducer;
