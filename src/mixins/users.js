import { getTokenApi } from "@/api/token";
import apiUsers from "@/api/users";

export const userMixin = {
  retrieve: function() {
    const token = getTokenApi();
    let user = null;

    if (token) {
      apiUsers
        .retrieve()
        .then(response => {
          user = response.data;
          this.$store.dispatch("retrieveUser", user);
        })
        .catch(error => {
          console.log(error);
          deleteTokenApi();
        });
    }

    return user;
  }
};
