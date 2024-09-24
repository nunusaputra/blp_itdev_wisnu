import { createSlice } from "@reduxjs/toolkit";
import {
  createTodos,
  deleteTodos,
  fetchTodos,
  getTodos,
  getTodosID,
  updateTodos,
} from "../Action/todosAction";

const initialState = {
  todos: [],
  isLoading: false,
  sukses: false,
  error: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    resetTodos: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Fetch Todos Builder
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get All Todos Builder
    builder.addCase(getTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.todos = action.payload;
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Todos By ID Builder
    builder.addCase(getTodosID.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTodosID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.todos = action.payload;
    });
    builder.addCase(getTodosID.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Create Todos Builder
    builder.addCase(createTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.todos = action.payload;
    });
    builder.addCase(createTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Update Todos Builder
    builder.addCase(updateTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sukses = true;
      state.message = action.payload;
    });
    builder.addCase(updateTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    });

    // * Delete Todos Builder
    builder.addCase(deleteTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(deleteTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetTodos } = todosSlice.actions;
export default todosSlice.reducer;
