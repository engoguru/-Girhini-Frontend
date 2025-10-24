import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseurl from '../../utils/baseurl';

// ✅ Create Gallery
export const createGallery = createAsyncThunk(
  "gallery/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/api/gallery/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create gallery"
      );
    }
  }
);

// ✅ Fetch All Galleries
export const fetchAllGallery = createAsyncThunk(
  "gallery/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseurl}/api/gallery/getAll`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch galleries"
      );
    }
  }
);

// ✅ Update Gallery (delete + add images)
export const updateGallery = createAsyncThunk(
  "gallery/update",
  async ({ id, formData }, { rejectWithValue }) => {
    console.log(id,formData,"oo")
    try {
      const response = await axios.put(
        `${baseurl}/api/gallery/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update gallery"
      );
    }
  }
);

// ✅ Initial state
const initialState = {
  galleryCreate: null,
  galleryAll: [],
  updateGallery: null,
  loading: false,
  error: null,
};

// ✅ Gallery Slice
const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    resetGalleryState: (state) => {
      state.galleryCreate = null;
      state.updateGallery = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===== CREATE GALLERY =====
      .addCase(createGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.galleryCreate = action.payload;
      })
      .addCase(createGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH ALL GALLERIES =====
      .addCase(fetchAllGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.galleryAll = action.payload;
      })
      .addCase(fetchAllGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== UPDATE GALLERY =====
      .addCase(updateGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.updateGallery = action.payload;
      })
      .addCase(updateGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export Actions & Reducer
export const { resetGalleryState } = gallerySlice.actions;
export default gallerySlice.reducer;
