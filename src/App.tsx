import React, { useState } from "react";
import "./App.css";
import PouchDB from "pouchdb";

(async () => {
  let localDB = new PouchDB("testsync");
  try {
    let remoteDB = new PouchDB("http://localhost:5984/testsync");
    const createRemoteDB = await remoteDB.info(); // Api call to make the remote db
    console.log(createRemoteDB);
    // localDB
    //   .sync(remoteDB)
    //   .on("complete", () => {
    //     console.log("sync successful!");
    //   })
    //   .on("error", error => {
    //     console.log("sync failed");
    //   });
  } catch (error) {
    console.log(error);
  }

  try {
    const info = await localDB.info();
    console.log(info);
  } catch (error) {
    console.log(error);
  }

  try {
    let doc = {
      _id: "002",
      name: "Karthi",
      age: 23,
      designation: "Designer"
    };
    const put = await localDB.put(doc);
    console.log(put);
  } catch (error) {
    console.log(error);
  }

  try {
    const get = await localDB.get("002");
    console.log(get);
  } catch (error) {
    console.log(error);
  }
})();

const Headline = () => {
  // useState adds state to react components made arrow functions
  const [greeting, setGreeting] = useState("Hello Function Component!");
  return <h1>{greeting}</h1>;
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Headline />
    </div>
  );
};

export default App;
