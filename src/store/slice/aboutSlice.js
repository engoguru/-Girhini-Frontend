// src/redux/slices/aboutSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseurl from '../../utils/baseurl';

// ✅ CREATE
export const createAbout = createAsyncThunk(
  'about/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/api/about/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create About');
    }
  }
);

// ✅ FETCH ALL
export const fetchAllAbout = createAsyncThunk(
  'about/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseurl}/api/about/getAll`);
      return response.data.about;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch About entries');
    }
  }
);

// ✅ DELETE
export const deleteAbout = createAsyncThunk(
  'about/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}/api/about/delete/${id}`);
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete About entry');
    }
  }
);

// ✅ UPDATE
export const updateAbout = createAsyncThunk(
  'about/update',
  async ({ id, formData }, { rejectWithValue }) => {
    console.log(id,formData,"ghgj")
    try {
      const response = await axios.put(`${baseurl}/api/about/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update About entry');
    }
  }
);


const initialState = {
  aboutCreate: null,
  aboutAll: [],
  aboutUpdate: null,
  aboutDelete: null,

  loading: false,
  error: null,
  successMessage: null,
};
;
const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    clearAboutMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ CREATE
      .addCase(createAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutCreate = action.payload;
        state.aboutAll.unshift(action.payload.about);
        state.successMessage = 'About entry created successfully';
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ FETCH ALL
      .addCase(fetchAllAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutAll = action.payload;
      })
      .addCase(fetchAllAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ DELETE
      .addCase(deleteAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutDelete = action.payload;
        state.aboutAll = state.aboutAll.filter((item) => item._id !== action.payload.id);
        state.successMessage = 'About entry deleted successfully';
      })
      .addCase(deleteAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ UPDATE
      .addCase(updateAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutUpdate = action.payload;
        const updated = action.payload.about;
        state.aboutAll = state.aboutAll.map((item) =>
          item._id === updated._id ? updated : item
        );
        state.successMessage = 'About entry updated successfully';
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearAboutMessages } = aboutSlice.actions;
export default aboutSlice.reducer;