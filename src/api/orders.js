import { API_URL } from "@/utils/constants.js";
import axios from "axios";

const apiOrders = {
  byUser: function(idEvent, idUser) {
    return axios.get(`${API_URL}/api/orders/by-user/${idEvent}/${idUser}`);
  },
  byEvent: function(idEvent) {
    return axios.get(`${API_URL}/api/orders/by-event/${idEvent}/`);
  },
  addItem: function(formData) {
    return axios.post(`${API_URL}/api/orders/cart/add/`, formData);
  },
  updateItem: function(idOrder, formData) {
    return axios.put(`${API_URL}/api/orders/cart/update/${idOrder}/`, formData);
  },
  removeItem: function(idOrder) {
    return axios.delete(`${API_URL}/api/orders/cart/remove/${idOrder}/`);
  },
  editItem: function(idOrder, formData) {
    return axios.put(`${API_URL}/api/orders/cart/edit/${idOrder}/`, formData);
  },
  editPaid: function(idOrder, formData) {
    return axios.put(`${API_URL}/api/orders/paid-out/${idOrder}/`, formData);
  }
};

export default apiOrders;
