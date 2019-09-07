import React, { useState } from "react";
import "./App.css";
import PouchDB from "pouchdb";

(async () => {
  let db = new PouchDB("test");
  try {
    const info = await db.info();
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
    const put = await db.put(doc);
    console.log(put);
  } catch (error) {
    console.log(error);
  }

  try {
    const get = await db.get("002");
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
