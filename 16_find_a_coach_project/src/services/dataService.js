export default class DataService {
  databaseUrl =
    "https://find-a-coach-pro-default-rtdb.europe-west1.firebasedatabase.app/coaches.json";

  getData = async () => {
    const res = await fetch(this.databaseUrl);
    if (!res.ok) {
      throw new Error(
        `Could not fetch ${this.databaseUrl}, received ${res.status}`
      );
    }
    return await res.json();
  };

  sendData = async (data) => {
    const res = await fetch(this.databaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log("Coach saved");
      return res
    } else {
      throw new Error("Could not save data");
    }
  };
}
