import { getTokenApi } from "@/api/token";
import { API_URL } from "@/utils/constants.js";
import axios from "axios";

const apiEvents = {
  list: function(status, page) {
    return axios.get(`${API_URL}/api/events/list/${status}/?page=${page}`, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  },
  listDetail: function(idEvent) {
    return axios.get(`${API_URL}/events/${idEvent}/`, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  },
  retrieve(idEvent) {
    return axios.get(`${API_URL}/api/events/retrieve/${idEvent}/`, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  },
  validate_permission(idEvent, idUser) {
    return axios.get(`${API_URL}/api/events/validate/${idEvent}/${idUser}/`, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  },
  getStatus(idEvent) {
    return axios.get(`${API_URL}/api/events/status/${idEvent}/`, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  },
  detail(idEvent) {
    return axios.get(`${API_URL}/api/events/detail/${idEvent}/`, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  },
  editStatus(idEvent, formData) {
    return axios.put(
      `${API_URL}/api/events/update-status/${idEvent}/`,
      formData,
      {
        headers: {
          Authorization: `Token ${getTokenApi()}`
        }
      }
    );
  },
  byUser: function(idUser) {
    return axios.get(`${API_URL}/api/events/by-user/${idUser}/`, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  },
  create: function(formData) {
    return axios.post(`${API_URL}/api/events/`, formData, {
      headers: {
        Authorization: `Token ${getTokenApi()}`,
        "Content-Type": "multipart/form-data"
      }
    });
  },
  update: function(idEvent, formData) {
    return axios.put(`${API_URL}/api/events/${idEvent}/`, formData, {
      headers: {
        Authorization: `Token ${getTokenApi()}`,
        "Content-Type": "multipart/form-data"
      }
    });
  },
  createDetail: function(formData) {
    return axios.post(`${API_URL}/api/events/detail/create/`, formData, {
      headers: {
        Authorization: `Token ${getTokenApi()}`,
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
          Authorization: `Token ${getTokenApi()}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },
  delete: function(idEvent) {
    return axios.delete(`${API_URL}/api/events/${idEvent}/`, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  }
};

export default apiEvents;
