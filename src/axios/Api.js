import axios from "axios";
import cookie from "cookie";
export const URL = "https://10.100.17.47/FairEx/api/v1/";

export const ADMIN_LOGIN = "admin/login";
export const WAREHOUSE = "admin/warehouse"; // resources
export const MERCHANT = "admin/merchant"; // resources
export const DELIVERYMAN = "admin/pickup-assign";
export const LOCATION_LIST = "admin/location-data";
export const WAREHOUSE_AVAILABLE = "admin/warehouse-available";
export const AVAILABLE = "admin/available";
export const EDITPARCEL = "admin/parcel";

const API = async (config) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: "net work error",
          status: 500,
        };
      }
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  config.baseURL = URL;
  return axios(config);
};

export default API;
