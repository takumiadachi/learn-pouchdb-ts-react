import generate from "nanoid/generate";
import PouchDB from "pouchdb";
import React, { useEffect, useState } from "react";
import "./App.css";
import User from "./interfaces/User";
import { AddDummyDataComponent } from "./components/AddDummyDataComponent";
import { ShowDummyDataComponent } from "./components/ShowDummyDataComponent";

(async () => {
  // // Delete LOCAL test db and start from scratch
  // try {
  //   let destroyLocalDB = await new PouchDB("testsync");
  //   const exists = await destroyLocalDB.info();
  //   if (exists) {
  //     await destroyLocalDB.destroy();
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  // // Delete REMOTE test db and start from scratch
  // try {
  //   let destroyRemoteDB = await new PouchDB("http://localhost:5984/testsync");
  //   const exists = await destroyRemoteDB.info();
  //   if (exists) {
  //     await destroyRemoteDB.destroy();
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  // Create new LOCAL and REMOTE dbs then keep syncing them
  let localDB = new PouchDB("testsync");
  console.log(localDB);
  try {
    let remoteDB = await new PouchDB("http://localhost:5984/testsync");
    localDB
      .sync(remoteDB, { live: true })
      .on("complete", () => {
        console.log("sync successful!");
      })
      .on("error", error => {
        console.log("sync failed");
      });
  } catch (error) {
    console.log(error);
  }

  // Test if local db is created
  try {
    const info = await localDB.info();
    console.log(info);
  } catch (error) {
    console.log(error);
  }

  // Add a user
  // try {
  //   let doc = {
  //     _id: genuuid(),
  //     name: "Karthi"
  //   };
  //   await localDB.put(doc);
  // } catch (error) {
  //   console.log(error);
  // }

  // Add more users
  // await addUser(localDB, genuuid(), "Trisha");
  // await addUser(localDB, genuuid(), "Edward");
  // await addUser(localDB, genuuid(), "Alphonse");
  // const got = await getUser(localDB, "005");
  // console.log(got);

  // Create view that gets all docs
  try {
    let doc: PouchDB.Core.PutDocument<{}> = {
      _id: "_design/view",
      views: {
        all: {
          // Needs to be a string because pouchdb executes the string as code.
          map: `function(doc) {
            emit(doc.name);
          }`
        }
      }
    };
    const addDesignDoc = await localDB.put(doc);
    return addDesignDoc;
  } catch (error) {
    console.log(error);
  }

  // Use the view created
  // try {
  //   const data = await localDB.query("view/all");
  //   console.log(data);
  //   const dd = await getUsers(localDB);
  //   console.log(dd);
  // } catch (error) {
  //   console.log(error);
  // }
})();

const Headline = () => {
  // useState adds state to react arrow function components through hooks
  const [greeting, setGreeting] = useState("Hello Function Component!");
  return <h1>{greeting}</h1>;
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Headline />
      <AddDummyDataComponent dbName="testsync" />
      <ShowDummyDataComponent dbName="testsync" />
    </div>
  );
};

export default App;
