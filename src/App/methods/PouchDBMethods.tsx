import User from "../interfaces/User";
const dictionaryNumbers = require("nanoid-dictionary/numbers"); // Can create ids with only numbers
const generate = require("nanoid/generate");
var faker = require("faker"); // Provides fake data

export async function addUser(
  db: PouchDB.Database<{}>,
  id: string,
  name: string
) {
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

export async function getUser(db: PouchDB.Database<{}>, id: string) {
  try {
    const got = await db.get(id);
    return got;
  } catch (error) {
    return null;
  }
}

export async function getUsers(db: PouchDB.Database<{}>) {
  try {
    const data = await db.query<User>("view/all");
    const users = data.rows.map(user => {
      // Convert wild data into typed.
      const item: User = {
        _id: user.id,
        name: user.key
      };
      return item;
    });
    console.log(users);
    return users;
  } catch (error) {
    return null;
  }
}

export async function addDummyData(db: string) {
  const connection = new PouchDB(db);
  addUser(connection, genuuid(), faker.name.findName());
}

export function genuuid() {
  return generate(dictionaryNumbers, 4);
}
