import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseurl from '../../utils/baseurl';


export const createreview = createAsyncThunk(
  "review/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/api/review/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating review");
    }
  }
);


export const getAllreview = createAsyncThunk(
  "review/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/api/review/getAll`);
      return data.reviews; // assuming response has { message, total, reviews }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching reviews");
    }
  }
);

export const deletereview = createAsyncThunk(
  "review/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseurl}/api/review/delete/${id}`);
      return { id, message: data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting review");
    }
  }
);


const initialState = {
  reviewCreate: null,
  reviewFetch: [],
  reviewDelete: null,
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
    resetCreateReview: (state) => {
      state.reviewCreate = null;
    },
    resetDeleteReview: (state) => {
      state.reviewDelete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Review
      .addCase(createreview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createreview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewCreate = action.payload;
        state.reviewFetch.unshift(action.payload.review); // add new review to top
      })
      .addCase(createreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Reviews
      .addCase(getAllreview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllreview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewFetch = action.payload;
      })
      .addCase(getAllreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Review
      .addCase(deletereview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletereview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewDelete = action.payload;
        state.reviewFetch = state.reviewFetch.filter(r => r._id !== action.payload.id);
      })
      .addCase(deletereview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewError, resetCreateReview, resetDeleteReview } = reviewSlice.actions;
export default reviewSlice.reducer;
