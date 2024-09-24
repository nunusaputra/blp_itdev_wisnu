import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url = import.meta.env.VITE_API_URL_AUTH;

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/register`, formData, {
        headers: {
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

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${url}/login`, data);
    const decoded = jwtDecode(response.data.accessToken);
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      profile: decoded.profileURL,
      token: response.data.accessToken,
    };
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getMe = createAsyncThunk("auth/getMe", async (token, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/token`);
      const decoded = jwtDecode(response.data.accessToken);
      return {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        profile: decoded.profileURL,
        token: response.data.accessToken,
      };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.delete(`${url}/logout`);
    return response.data.message;
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});
