import axios from 'axios';

axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('accessToken');

interface RegisterUserInformation {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginUserInformation {
  email: string;
  password: string;
}

export default class userService {
  register(userInformation: RegisterUserInformation) {
    return axios
      .post(`${process.env.REACT_APP_API_USERS_URI}/register`, userInformation)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }

  login(userInformation: LoginUserInformation) {
    return axios
      .post(`${process.env.REACT_APP_API_USERS_URI}/login`, userInformation)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  getAuthenticatedUser() {
    return axios
      .post(`${process.env.REACT_APP_API_USERS_URI}/getAuthenticatedUser`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });
  }
}
