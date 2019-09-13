import React, { useEffect, useState } from "react";
import "./App.css";
import { AddDummyDataComponent } from "./components/AddDummyDataComponent";
import { ShowDummyDataComponent } from "./components/ShowDummyDataComponent";
import { Observable } from "rxjs";

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
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
