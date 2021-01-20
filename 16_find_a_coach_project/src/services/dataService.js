export default class DataService {
  databaseUrl =
    "https://find-a-coach-pro-default-rtdb.europe-west1.firebasedatabase.app/";

  getData = async (targetDB) => {
    const url = this.databaseUrl + targetDB + ".json";
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getDataById = async (targetDB, id) => {
    const url = this.databaseUrl + targetDB + "/" + id + ".json";
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
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
    if (res.ok) {
      console.log("Saved in ", url);
      return res;
    } else {
      throw new Error("Could not save data");
    }
  };
}
