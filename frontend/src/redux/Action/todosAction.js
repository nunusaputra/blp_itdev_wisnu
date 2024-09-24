import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_TODOS;

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/fetch-todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTodosID = createAsyncThunk(
  "todos/getTodosID",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTodos = createAsyncThunk(
  "todos/createTodos",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}`, data.formData, {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTodos = createAsyncThunk(
  "todos/updateTodos",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(`${url}/${data.id}`, data.formData, {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.message;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${url}/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.message;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
