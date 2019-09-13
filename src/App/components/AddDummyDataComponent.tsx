import DummyDataProps from "../interfaces/DummyDataProps";

import React from "react";
import { addDummyData } from "../methods/PouchDBMethods";

export const AddDummyDataComponent: React.FC<DummyDataProps> = (
  props: DummyDataProps
) => {
  const handleClick = async (event: any) => addDummyData(props.dbName);

  const html = <button onClick={handleClick}>Add Dummy Users</button>;
  return html;
};
