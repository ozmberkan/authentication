import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerService.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(registerService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerService.rejected, (state) => {
        state.isError = true;
        state.errorMessage = "Bir hata ile karşılaşıldı";
      })
      .addCase(loginService.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginService.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = "Bir hata ile karşılaşıldı";
      });
  },
});

export const registerService = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        data
      );
      toast.success("Kullanıcı Kaydı Başarıyla Oluşturuldu");
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginService = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data
      );
      toast.success("Kullanıcı Başarıyla Giriş Yaptı");
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = userSlice.actions;

export default userSlice.reducer;
