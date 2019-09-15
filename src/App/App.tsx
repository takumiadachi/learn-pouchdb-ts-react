import React, { useEffect, useState } from "react";
import "./App.css";
import { AddDummyDataComponent } from "./components/AddDummyDataComponent";
import { ShowDummyDataComponent } from "./components/ShowDummyDataComponent";
import { Observable } from "rxjs";
import { from } from "rxjs";
import { Observer } from "rx";

export function addUserObservable() {
  const observable = new Observable(subscriber => {});
}

var observable = Observable.create((observer: any) => {
  try {
    observer.next("hey guys!");
    observer.next("how are you?");
    setInterval(() => {
      observer.next("I am Good");
    }, 1000);
    // observer.complete();
  } catch (error) {
    observer.error(error);
  }
});

let observer = observable.subscribe(
  (x: any) => addItem(x),
  (error: any) => addItem(error),
  () => addItem("Completed")
);

setTimeout(() => {
  observer.unsubscribe();
}, 6001);

function addItem(val: any) {
  console.log(val);
}

// const observable = from([10, 20, 30]);
// const subscription = observable.subscribe(x => console.log(x));
// Later
// subscription.unsubscribe;

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
