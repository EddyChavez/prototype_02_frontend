import { getTokenApi } from "@/api/token";
import { API_URL } from "@/utils/constants.js";
import axios from "axios";

const apiGroups = {
  byUser: function(idUser) {
    return axios.get(`${API_URL}/api/tribes/by-user/${idUser}/`);
  },
  myGroups: function(idUser) {
    return axios.get(`${API_URL}/api/users/belong-tribes/${idUser}/`);
  },
  members: function(kword) {
    return axios.get(`${API_URL}/api/members/?kword=${kword}`);
  },
  getUsers: function() {
    return axios.get(`${API_URL}/api/users/`);
  },
  getGroups: function(kword) {
    return axios.get(`${API_URL}/api/tribes/?kword=${kword}`);
  },
  getMembers: function(idGroup) {
    return axios.get(`${API_URL}/api/tribes/members/${idGroup}/`);
  },
  addGroup: function(formData) {
    return axios.post(`${API_URL}/api/tribes/add/`, formData, {
      headers: {
        Authorization: `Token ${getTokenApi()}`,
        "Content-Type": "multipart/form-data"
      }
    });
  },
  editGroup: function(idGroup, formData) {
    return axios.put(`${API_URL}/api/tribes/edit/${idGroup}/`, formData, {
      headers: {
        Authorization: `Token ${getTokenApi()}`,
        "Content-Type": "multipart/form-data"
      }
    });
  },
  removeGroup: function(idGroup) {
    return axios.delete(`${API_URL}/api/tribes/remove/${idGroup}/`, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  },
  sendEmail: function(formData) {
    return axios.post(`${API_URL}/api/tribes/invitations/`, formData, {
      headers: {
        Authorization: `Token ${getTokenApi()}`
      }
    });
  }
};

export default apiGroups;
