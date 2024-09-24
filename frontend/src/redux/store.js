import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/authSlice";
import todosSlice from "./Slice/todosSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    todos: todosSlice,
  },
});

export default store;
