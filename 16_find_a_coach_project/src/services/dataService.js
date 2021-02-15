export default class DataService {
  databaseUrl =
    "https://find-a-coach-pro-default-rtdb.europe-west1.firebasedatabase.app/";

  signUpUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC455g0x84G6uSYxXLWkIzWPnsWfj6ZNo";

  signInUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBC455g0x84G6uSYxXLWkIzWPnsWfj6ZNo";

  getRequests = async (id, token) => {
    let auth = "";
    if (token) {
      auth = "?auth=" + token;
    }
    const url = this.databaseUrl + "requests" + "/" + id + ".json" + auth;
    await console.log(this.fetchData(url));
    return await this.fetchData(url);
  };

  getCoachDetails = async (id) => {
    console.log(id);
    const url = this.databaseUrl + "coaches.json";
    const coaches = await this.fetchData(url);
    const requestedKey = Object.keys(coaches).find(
      (key) => coaches[key].id === id
    );
    return coaches[requestedKey];
  };

  getCoaches = async () => {
    const url = this.databaseUrl + "coaches.json";
    return await this.fetchData(url);
  };

  signUp = async (data) => {
    const url = this.signUpUrl;
    return await this.postData(url, data);
  };

  signIn = async (data) => {
    const url = this.signInUrl;
    return await this.postData(url, data);
  };

  addRequest = async (data, id) => {
    const url = this.databaseUrl + "requests/" + id + ".json";
    return await this.postData(url, data);
  };

  addCoach = async (data, token) => {
    const url = this.databaseUrl + "coaches.json?auth=" + token;
    return await this.postData(url, data);
  };

  fetchData = async (url) => {
    const res = await fetch(url);
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.error.message);
    }
    return responseData;
  };

  postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await res.json();
    console.log("responseData", responseData);
    if (!res.ok) {
      throw new Error(responseData.error.message);
    }
    return responseData;
  };
}
