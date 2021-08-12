import { API_URL } from "@/utils/constants.js";
import axios from "axios";

const apiEvents = {
  list: function() {
    return axios.get(`${API_URL}/api/events/`);
  },
  listDetail: function(idEvent) {
    return axios.get(`${API_URL}/events/${idEvent}/`);
  },
  retrieve(idEvent) {
    return axios.get(`${API_URL}/api/events/retrieve/${idEvent}/`);
  },
  detail(idEvent) {
    return axios.get(`${API_URL}/api/events/detail/${idEvent}/`);
  },
  byUser: function(idUser) {
    return axios.get(`${API_URL}/api/events/by-user/${idUser}/`);
  },
  create: function(formData) {
    return axios.post(`${API_URL}/api/events/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  update: function(idEvent, formData) {
    return axios.put(`${API_URL}/api/events/${idEvent}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  createDetail: function(formData) {
    return axios.post(`${API_URL}/api/events/detail/create/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  updateDetail: function(idDetail, formData) {
    return axios.put(
      `${API_URL}/api/events/detail/update/${idDetail}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },
  delete: function(idEvent) {
    return axios.delete(`${API_URL}/api/events/${idEvent}/`);
  }
};

export default apiEvents;
