import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';

const useRefreshToken = () => {
  const dispatch = useDispatch(); // Use useDispatch to get the dispatch function

  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('/api/v1/auth/refresh-token',, {
        withCredentials: true,
      });

      // Dispatch the setToken action to update the Redux state
      dispatch(authActions.setToken(response.data.token));

      // Return the new access token
      return response.data.token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      // When refresh token fails, logout the user
      dispatch(authActions.logout());
      throw error; // Re-throw the error for handling in the calling code
    }
  };

  return refresh; // Return the refresh function
};

export default useRefreshToken;