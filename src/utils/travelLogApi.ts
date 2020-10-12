import axios from "axios";
import { cords } from "./context";

const uri = "http://localhost:5000/api";

export interface IInput {
  username: string;
  password: string;
}

export const userLogin = async ({ username, password }: IInput) => {
  return await axios.post(
    `${uri}/user/login`,
    {
      username,
      password,
    },
    { withCredentials: true }
  );
};

export const logout = async () => {
  return await axios.post(`${uri}/user/logout`, {}, { withCredentials: true });
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${uri}/user/refreshtoken`,
    {},
    { withCredentials: true }
  );
  return res;
};

export const getLogs = async (token: string) => {
  const res = await axios.get(`${uri}/logs/`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return res;
};

export interface ILog {
  title: string;
  description?: string;
  visitedDate: string;
  rating: Number;
  location: { type: "Point"; coordinates: cords };
}

export const createLog = async (token: string, LogsData: ILog) => {
  const res = await axios.post(
    `${uri}/logs/create`,
    {
      data: LogsData,
    },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
  return res;
};
