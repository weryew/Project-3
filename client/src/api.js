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
      .catch(errHandler);
  },
  //get details of a dish
  getDish(id) {
    return service
      .get(`/dishes/oneDish/${id}`)
      .then(res => res.data)
      .catch(errHandler);
  },
  //get recipe details
  getRecipe(id) {
    return service
      .get(`/dishes/${id}/recipe`)
      .then(res => res.data[0])
      .catch(errHandler);
  },
  //get restaurants list
  getRestos(id) {
    return service
      .get(`/dishes/${id}/restaurants`)
      .then(res => res.data)
      .catch(errHandler);
  },
  //get details of one restaurant
  getResto(id) {
    return service
      .get(`/dishes/oneRest/${id}`)
      .then(res => res.data)
      .catch(errHandler);
  },
  //add review to a recipe
  addReview(id, rating, comment) {
    return service
      .post(`dishes/${id}/recipeReview`, { rating, comment })
      .then(res => res.data)
      .catch(errHandler);
  },
  //get all the reviews of a recipe
  getReviews(id) {
    return service
      .get(`dishes/${id}/reviews`)
      .then(res => res.data)
      .catch(errHandler);
  },
  //add a restaurant
  addResto(resto) {
    return service
      .post("/restaurants", resto)
      .then(res => res.data)
      .catch(errHandler);
  },
  //add a dish when adding a restaurant
  addDish(dish) {
    return service
      .post("/dishes/newDish", dish)
      .then(res => res.data)
      .catch(errHandler);
  }
};
