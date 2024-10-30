import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (payload: any) => {
  const response = await axios('https://jsonplaceholder.typicode.com/users');
  return response.data;
});
