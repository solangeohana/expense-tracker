import axios from "axios";

export const signup = (email, password) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, {withCredentials: true}, { email, password })
    .then(response => response.data)
}

//  return axios.post('/api/signup', { email, password })
