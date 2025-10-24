// src/redux/slices/contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseurl from '../../utils/baseurl';

// ====================
// ASYNC THUNKS (with Axios inside)
// ====================

// CREATE
export const createContactThunk = createAsyncThunk(
  'contacts/create',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${baseurl}/api/contact/create`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to create contact'
      );
    }
  }
);

// READ (all contacts)
export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${baseurl}/api/contact/get`);
      console.log(res,"")
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch contacts'
      );
    }
  }
);

// UPDATE
export const updateContactThunk = createAsyncThunk(
  'contacts/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await axios.put(`${baseurl}/api/contact/${id}`, updatedData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update contact'
      );
    }
  }
);

// DELETE
export const deleteContactThunk = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${baseurl}/api/contact/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete contact'
      );
    }
  }
);

// ====================
// INITIAL STATE
// ====================
const initialState = {
  contactAll: [],
  loading: false,
  error: null,
  success: null,
};

// ====================
// SLICE
// ====================
const contactSlice = createSlice({
  name: ' contactAll',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createContactThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContactThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Contact created successfully!';
        state. contactAll.push(action.payload);
      })
      .addCase(createContactThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // READ
      .addCase(getContactsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.contactAll= action.payload;
      })
      .addCase(getContactsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateContactThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Contact updated successfully!';
        state. contactAll = state.contactAll.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        );
      })
      .addCase(updateContactThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteContactThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Contact deleted successfully!';
        state.contactAll= state.contactAll.filter(
          (contact) => contact._id !== action.payload._id
        );
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ====================
// EXPORTS
// ====================
export const { clearMessages } = contactSlice.actions;
export default contactSlice.reducer;
