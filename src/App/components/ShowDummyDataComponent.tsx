import { useEffect, useState } from "react";
import User from "../interfaces/User";
import DummyDataProps from "../interfaces/DummyDataProps";
import React from "react";
import { getUsers } from "../methods/PouchDBMethods";
import PouchDB from "pouchdb";

export const ShowDummyDataComponent: React.FC<DummyDataProps> = (
  props: DummyDataProps
) => {
  const [data, setData] = useState<(User[]) | undefined>();

  // Similar to componentDidMount & componentDidUpdate
  // Use async code here
  useEffect(() => {
    (async () => {
      try {
        let db = await new PouchDB(props.dbName);
        const users = await getUsers(db);
        if (users) {
          setData(users);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (data) {
    const listItems = data.map(item => {
      return <li key={item._id}>{item.name}</li>;
    });
    const html = (
      <ul style={{ listStyle: "none" }}>{listItems ? listItems : null}</ul>
    );

    return html;
  } else {
    return <div> Under Construction </div>;
  }
};
