import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

/* ================= CREATE BID ================= */
export const createBid = createAsyncThunk(
  "bids/create",
  async ({ gigId, message, price }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/bids", {
        gigId,
        message,
        price,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= GET BIDS BY GIG ================= */
export const fetchBidsByGig = createAsyncThunk(
  "bids/fetchByGig",
  async (gigId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/bids/${gigId}`);
      return res.data.data; // ✅ bids array
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= HIRE BID ================= */
export const hireBid = createAsyncThunk(
  "bids/hire",
  async (bidId, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/api/bids/${bidId}/hire`);
      return { bidId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


/* ================= MY BIDS ================= */
export const fetchMyBids = createAsyncThunk(
  "bids/myBids",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/bids/my-bids");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);
