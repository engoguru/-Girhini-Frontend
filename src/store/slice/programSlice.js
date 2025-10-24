import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from '../../utils/baseurl';



// CREATE
export const createProgramThunk = createAsyncThunk(
  ' program/create',
  async (data, thunkAPI) => {
    try {
     
      const res = await axios.post(`${baseurl}/api/program/create`, data);
    
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed '
      );
    }
  }
);

// fetchAll
export const fetchAllProgram=createAsyncThunk(
  "program/fetch",
  async(_,thunkAPI)=>{
    try {
       const res = await axios.get(`${baseurl}/api/program/get`);

      return res?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed '
      );
    }
  }
)
// fetch-0ne
export const fetchOneProgram=createAsyncThunk(
  "program/fetchOne",
  async(id,thunkAPI)=>{
    try {
       const res = await axios.get(`${baseurl}/api/program/getOne/${id}`);
 
      return res?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed '
      );
    }
  }
)
export const updateProgramThunk = createAsyncThunk(
  "program/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axios.put(`${baseurl}/api/program/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update program"
      );
    }
  }
);
  
export const deleteProgramThunk=createAsyncThunk(
  "program/delete",
  async(id,thunkAPI)=>{
    try {
       const res = await axios.get(`${baseurl}/api/program/delete/${id}`);
    console.log(res,"jhi")
      return res?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed '
      );
    }
  }
)

// INITIAL STATE
// ====================
const initialState = {
  programCreate:null,
  Allprogram:[],
  Oneprogram:null,
  loading: false,
  error: null,
  success: null,
};


// SLICE
// ====================
const programSlice = createSlice({
  name: 'program',
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
      .addCase(createProgramThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProgramThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Contact created successfully!';
        state.programCreate=action.payload;
      })
      .addCase(createProgramThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // READ
      .addCase(fetchAllProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.Allprogram= action.payload;
      })
      .addCase(fetchAllProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

            // READ-One
      .addCase(fetchOneProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.Oneprogram= action.payload;
      })
      .addCase(fetchOneProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  
  },
});
// EXPORTS
// ====================
export const { clearMessages } = programSlice.actions;
export default programSlice.reducer;