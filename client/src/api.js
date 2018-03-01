import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3000/api"
});

const errHandler = err => {
  console.error(err.response.data);
  throw err.response.data;
};

export default {
  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },
  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        const { data } = res;
        localStorage.setItem("user", JSON.stringify(data));
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
        return data;
      })
      .catch(errHandler);
  },
  logout() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
  },

  loadUser() {
    const userData = localStorage.getItem("user");
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token && user.name) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
      return user;
    }
    return false;
  },
  //search dishes containing the query
  search(query) {
    return service
      .get(`/dishes/${query}`)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },
  //get details of a dish
  getDish(id) {
    return service
      .get(`/dishes/oneDish/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err;
      });
  },
  getRecipe(id) {
    return service
      .get(`/dishes/${id}/recipe`)
      .then(res => res.data[0])
      .catch(err => {
        console.err(err);
        throw err;
      });
  },
  getRestos(id) {
    return service
      .get(`/dishes/${id}/restaurants`)
      .then(res => res.data)
      .catch(err => {
        console.err(err);
        throw err;
      });
  },
  getResto(id) {
    return service
      .get(`/dishes/oneRest/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.err(err);
        throw err;
      });
  },
  addRating(id, rating) {
    return service
      .post(`dishes/${id}/recipeRating`, { rating })
      .then(res => res.data)
      .catch(err => {
        console.err(err);
        throw err;
      });
  }
};
