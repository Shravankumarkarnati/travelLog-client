import axios from "axios";

const uri = "http://localhost:5000/api";

export interface IInput {
  username: string;
  password: string;
}

export const register = async ({ username, password }: IInput) => {
  return await axios.post(`${uri}/user/register`, {
    username,
    password,
  });
};

export const login = async ({ username, password }: IInput) => {
  return await axios.post(`${uri}/user/login`, {
    username,
    password,
  });
};
