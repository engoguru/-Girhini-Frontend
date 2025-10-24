// src/redux/slices/blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseurl from '../../utils/baseurl';

// Create a new blog
export const createBlog = createAsyncThunk(
  'blog/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/api/blog/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create blog');
    }
  }
);

// Fetch all blogs
export const fetchAllBlog = createAsyncThunk(
  'blog/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseurl}/api/blog/getAll`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blogs');
    }
  }
);

// Fetch single blog by ID
export const fetchOneBlog = createAsyncThunk(
  'blog/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
   
      const response = await axios.get(`${baseurl}/api/blog/getOne/${id}`);
   
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blog');
    }
  }
);

// Delete blog by ID
export const deleteBlog = createAsyncThunk(
  'blog/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}/blogs/${id}`);
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete blog');
    }
  }
);

// Initial state
const initialState = {
blogCreate:null,
blogAll:[],
  blogOne: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Slice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearBlogMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogCreate=action.payload;
        state.successMessage = 'Blog created successfully';
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Blogs
      .addCase(fetchAllBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogAll = action.payload;
      })
      .addCase(fetchAllBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch One Blog
      .addCase(fetchOneBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogOne = action.payload;
      })
      .addCase(fetchOneBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Blog
    //   .addCase(deleteBlog.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(deleteBlog.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.blogs = state.blogs.filter((blog) => blog._id !== action.payload.id);
    //     state.successMessage = 'Blog deleted successfully';
    //   })
    //   .addCase(deleteBlog.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

// Export actions and reducer
export const { clearBlogMessages } = blogSlice.actions;
export default blogSlice.reducer;
