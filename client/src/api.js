import axios from "axios";

export const signup = (email, password) => {
  return axios.post(`/api/signup`, { email, password })
    .then(response => response.data)
}

//  return axios.post('/api/signup', { email, password })
