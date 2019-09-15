import User from "../interfaces/User";
import { getUsers } from "../methods/PouchDBMethods";

class UsersService {
  private _users: User[] | null = [];

  getUsers() {
    return this._users;
  }

  async initialize(dbName: string) {
    let db = await new PouchDB(dbName);
    const users = await getUsers(db);
    this._users = users;
  }
}

// (async () => {
//   try {
//     let db = await new PouchDB(props.dbName);
//     const users = await getUsers(db);
//     if (users) {
//       setData(users);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })();

export const usersService = new UsersService();
