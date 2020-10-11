import axios from "axios";

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
