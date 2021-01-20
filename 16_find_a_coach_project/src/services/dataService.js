export default class DataService {
  databaseUrl =
    "https://find-a-coach-pro-default-rtdb.europe-west1.firebasedatabase.app/";

  getDataById = async (targetDB, id) => {
    const url = this.databaseUrl + targetDB + "/" + id + ".json";
    return await this.fetchData(url);
  };

  getCoaches = async () => {
    const url = this.databaseUrl + "coaches.json";
    return await this.fetchData(url);
  };

  addRequest = async (data, id) => {
    const url = this.databaseUrl + "requests/" + id + ".json";
    return await this.postData(url, data);
  };

  addCoach = async (data) => {
    const url = this.databaseUrl + "coaches.json";
    return await this.postData(url, data);
  };

  postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(
        `Could not save data on ${url}, received ${res.status} ${res.message || ''}`
      );
    }
    return res;
  };

  fetchData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Could not fetch ${url}, received ${res.status} ${res.message || ''}`
      );
    }
    return await res.json();
  };
}
