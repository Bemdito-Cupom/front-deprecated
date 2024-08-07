import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from './api';

export async function getAllUsers() {
  return axiosInstance.get("/")
  .then((res: any)=> res.data)
  .catch((err: any) => console.log(err));
}

export async function signin(email: string, password: string) {
  axiosInstance.post("/user/login", {email: email, password: password})
  .then((res: AxiosResponse) => {
    const data = res.data;
    console.log(data);
  })
  .catch((err: AxiosError) => {console.error(err.name)})
  console.log(email, password);
}
