import axios from "axios";
import { cords } from "./context";
import jwt_decode from "jwt-decode";

const uri =
  process.env.NODE_ENV !== "development"
    ? process.env.REACT_APP_API
    : "http://localhost:5000/api";

export interface IInput {
  username: string;
  password: string;
}

export interface ILog {
  title: string;
  description?: string;
  visitedDate: string;
  rating: Number;
  location: { type: "Point"; coordinates: cords };
}

const checkAuth = async (token: string) => {
  const decoded: Record<string, string> = jwt_decode(token);
  if (parseInt(decoded.exp) - new Date().valueOf() / 1000 < 0) {
    const res = await refreshToken();
    const newToken = res.data.token;
    return newToken;
  } else return true;
};

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
  const response = await checkAuth(token);
  if (typeof response === "string") {
    token = response;
  }
  const res = await axios.get(`${uri}/logs/`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return res;
};

export const createLog = async (token: string, LogsData: ILog) => {
  const response = await checkAuth(token);
  if (typeof response === "string") {
    token = response;
  }
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

export const updateLog = async (token: string, LogsData: ILog) => {
  const response = await checkAuth(token);
  if (typeof response === "string") {
    token = response;
  }
  const res = await axios.post(
    `${uri}/logs/update`,
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

export const deleteLog = async (token: string, id: string) => {
  const response = await checkAuth(token);
  if (typeof response === "string") {
    token = response;
  }
  const res = await axios.delete(`${uri}/logs/delete/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return res;
};
