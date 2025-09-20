import { handleError } from "@/helpers/ErrorHandler";
import { UserProfileToken } from "@/types/user";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/";

export const loginApi = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(API_URL + "login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerApi = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(
      API_URL + "register",
      {
        email: email,
        username: username,
        password: password,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};