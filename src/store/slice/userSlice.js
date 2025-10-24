import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from "../../utils/baseurl";

// ========== CREATE USER ==========
export const createUser = createAsyncThunk(
  "user/create",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/api/auth/register`, userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// ========== LOGIN USER ==========
export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/api/auth/login`, loginData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ========== VERIFY OTP ==========
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/api/auth/verify-otp`, otpData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);

// ========== INITIAL STATE ==========
const initialState = {
  register: null,
  login: null,
  verify: null,
  loading: false,
  error: null,
};

// ========== SLICE ==========
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logoutUser: (state) => {
      state.login = null;
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- CREATE USER -----
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----- LOGIN USER -----
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
        localStorage.setItem("userToken", action.payload?.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----- VERIFY OTP -----
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verify = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logoutUser } = userSlice.actions;
export default userSlice.reducer;
