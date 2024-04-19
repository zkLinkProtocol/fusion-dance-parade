import axios from 'axios';
// import _ from 'lodash';
// import qs from 'qs';
// import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: '',
});
// http.defaults.transformRequest = data => {
//     // if (_.isPlainObject(data)) data = qs.stringify(data);
//     return data;
// };
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (reason) => {
    // toast.error(reason.message);
    if (reason.response && reason.response.data) {
      return Promise.reject(reason.response.data);
    }
    return Promise.reject(reason);
  },
);
export default axiosInstance;
