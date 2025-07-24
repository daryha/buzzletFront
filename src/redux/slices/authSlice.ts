import axiosInstance from "@/lib/axios";
import { LoginRes } from "@/services/auth";
import { LoginFormValues } from "@/validation/authSchema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: LoginRes | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchLogin = createAsyncThunk<LoginRes, LoginFormValues, { rejectValue: string }>(
  "auth/fetchLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<LoginRes>("/auth/login", { email, password });
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data.message ?? "Ошибка при логине");
      }
      return rejectWithValue("Непредвиденная ошибка");
    }
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  try {
    const { data } = await axiosInstance.get("/auth/@me");
    return data;
  } catch (err) {
    console.error(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<LoginRes>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Ошибка при входе";
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<LoginRes>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
