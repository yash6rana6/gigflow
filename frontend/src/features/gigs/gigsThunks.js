import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";


export const fetchGigs = createAsyncThunk(
  "gigs/fetchAll",
  async (search = "", { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/gigs?search=${search}`);
      return res.data.data; // ✅ gigs array
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


export const fetchGigById = createAsyncThunk(
  "gigs/fetchById",
  async (gigId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/gigs/${gigId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createGig = createAsyncThunk(
  "gigs/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/gigs", formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


export const fetchMyGigs = createAsyncThunk(
  "gigs/myGigs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/gigs/my-gigs");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);
