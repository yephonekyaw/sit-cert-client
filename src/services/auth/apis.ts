import axiosClient from "@/services/api/client";
import type { ApiResponse } from "../api/types";
import { type User } from "./types";

const getMe = async () =>
  axiosClient.get<ApiResponse<User>>("/shared/auth/me").then((res) => res.data);

export { getMe };
