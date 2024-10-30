import axios, { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

// import { authApi, mockApi } from '../../api/api';

export const BASE_URL = 'http://localhost:5000';

const baseApi = axios.create({ baseURL: BASE_URL });

export const authApi = {
  registrations: async (data: any) => baseApi.post('/auth/registrations', data),
  login: async (data: any) => baseApi.post('/auth/login', data),
  getUsers: async () => baseApi.get('/auth/users'),
};

class UserStoreClass {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData: AxiosResponse<any> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  isAuth = false;

  setIsAuth = (isAuth: boolean) => {
    this.isAuth = isAuth;
  };

  registrationAction = async (userName: string, password: string) => {
    try {
      const data = await authApi.registrations({ username: userName, password });
    } catch (error) {
      console.error(error);
    }
  };

  authAction = async (userName: string, password: string) => {
    try {
      const data = await authApi.login({ username: userName, password });
      const token = data.data.token;
      if (token) {
        localStorage.setItem('token', token);
        this.isAuth = true;
      } else {
        localStorage.setItem('token', '');
        this.isAuth = false;
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const userStore = new UserStoreClass();
