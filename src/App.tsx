import React, { useState } from "react";
import "./App.css";
import PouchDB from "pouchdb";
import generate from "nanoid/generate";
const dictionaryNumbers = require("nanoid-dictionary/numbers"); // Can create ids with only numbers
var faker = require("faker"); // Provides fake data

(async () => {
  // Delete LOCAL test db and start from scratch
  try {
    let destroyLocalDB = await new PouchDB("testsync");
    const exists = await destroyLocalDB.info();
    if (exists) {
      await destroyLocalDB.destroy();
    }
  } catch (error) {
    console.log(error);
  }

  // Delete REMOTE test db and start from scratch
  try {
    let destroyRemoteDB = await new PouchDB("http://localhost:5984/testsync");
    const exists = await destroyRemoteDB.info();
    if (exists) {
      await destroyRemoteDB.destroy();
    }
  } catch (error) {
    console.log(error);
  }

  // Create new LOCAL and REMOTE dbs then keep syncing them
  let localDB = await new PouchDB("testsync");
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
  try {
    let doc = {
      _id: genuuid(),
      name: "Karthi"
    };
    await localDB.put(doc);
  } catch (error) {
    console.log(error);
  }

  // Add more users
  await addUser(localDB, genuuid(), "Trisha");
  await addUser(localDB, genuuid(), "Edward");
  await addUser(localDB, genuuid(), "Alphonse");
  // const got = await getUser(localDB, "005");
  // console.log(got);

  // Create view
  let ddoc: PouchDB.Core.PutDocument<{}> = {
    _id: "_design/view",
    views: {
      all: {
        // @ts-ignore
        map: `function(doc) {
          emit(doc.name);
        }`
      }
    }
  };
  const addDesignDoc = await localDB.put(ddoc);
  console.log(addDesignDoc);
})();

async function addUser(db: PouchDB.Database<{}>, id: string, name: string) {
  try {
    let doc = {
      _id: id,
      name: name
    };
    const put = await db.put(doc);
    return put;
  } catch (error) {
    return null;
  }
}

async function getUser(db: PouchDB.Database<{}>, id: string) {
  try {
    const got = await db.get(id);
    return got;
  } catch (error) {
    return null;
  }
}

function genuuid() {
  return generate(dictionaryNumbers, 4);
}

const Headline = () => {
  // useState adds state to react components made arrow functions
  const [greeting, setGreeting] = useState("Hello Function Component!");
  return <h1>{greeting}</h1>;
};

async function addDummyData(db: string) {
  addUser(new PouchDB(db), genuuid(), faker.name.findName());
}

interface DummyDataProps {
  db: string;
}

const AddDummyDataComponent = (props: DummyDataProps) => {
  const handleClick = async (event: any) => addDummyData(props.db);

  const html = <button onClick={handleClick}>Add Dummy Users</button>;
  return html;
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Headline />
      <AddDummyDataComponent db="testsync" />
    </div>
  );
};

export default App;
