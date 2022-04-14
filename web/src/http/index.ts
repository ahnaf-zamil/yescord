import axios from "axios";
import { API } from "../const";

export const client = axios.create({
  baseURL: API.REST.BASE,
  withCredentials: true,
});
