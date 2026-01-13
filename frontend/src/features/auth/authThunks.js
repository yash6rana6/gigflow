import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

/* ================= REGISTER ================= */
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/register", formData);
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= LOGIN ================= */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/login", formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= LOGOUT ================= */
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/api/auth/logout");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


/* ================= GET CURRENT USER ================= */
export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/auth/me");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);