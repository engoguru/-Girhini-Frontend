import { combineReducers } from "@reduxjs/toolkit";

import contactReducer from "../slice/contactSlice.js"
import programReducer from "../slice/programSlice.js"
import blogReducer from "../slice/blogSlice.js"
import galleryReducer from "../slice/gallerySlice.js"
import reviewReducer from "../slice/reviewSlice.js"
import aboutReducer from "../slice/aboutSlice.js"

import userReducer from "../slice/userSlice.js"
const rootReducers = combineReducers({
contact:contactReducer  ,
program:programReducer,
blog:blogReducer,
gallery:galleryReducer,
review:reviewReducer,
about:aboutReducer,

user:userReducer
});

export default rootReducers;
