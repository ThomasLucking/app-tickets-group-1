import axios from "axios";
import { AUTH_URL } from "../../../src/config/api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const registerUserApi = async (user: RegisterData) => {
  const response = await axios.post(`${AUTH_URL}/register`, user);
  return response;
};

export const loginUserApi = async (email: string, password: string) => {
  const response = await axios.post(`${AUTH_URL}/login`, { email, password });
  return response;
};