import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3000/api"
});

const errHandler = err => {
  console.error(err);
  throw err.response ? err.response.data : err;
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
  addReview(id, review) {
    return service
      .post(`dishes/${id}/recipeReview`, review)
      .then(res => res.data)
      .catch(errHandler);
  },
  //add review to a resto
  addReviewResto(id, rating, comment) {
    return service
      .post(`dishes/${id}/restoReview`, { rating, comment })
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
  },
  //add dish to resto
  addDishToResto(id, dishId) {
    return service
      .post(`/dishes/oneRest/${id}`, { dishId })
      .then(res => res.data)
      .catch(errHandler);
  },
  // get all th meetups
  getMeetups() {
    return service
      .get("/restaurants/meetups")
      .then(res => res.data)
      .catch(errHandler);
  },
  addMeetup(id, meetup) {
    return service
      .post(`/oneRest/${id}/addMeetup`, meetup)
      .then(res => res.data)
      .catch(errHandler);
  },
  addPerson(meetupId) {
    return service
      .post(`/oneRest/addPerson`, { meetupId })
      .then(res => res.data)
      .catch(errHandler);
  }
};
