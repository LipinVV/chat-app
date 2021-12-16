import './App.css';
import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from "react";
import {UserManager} from "./components/UserManager";
import {GET_USERS_QUERY} from "./graphql/Queries";

function App() {
  const [users, setUsers] = useState([]);

  const {loading, error, data} = useQuery(GET_USERS_QUERY);

  useEffect(() => {
    if(data) {
      setUsers(data.users)
    }
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

console.log(users)

  return (
      <div className="App">
        <div>
          <UserManager />
        </div>
        {users.map(user => {
          return (
              <div key={user.id}>
                <div>
                  <span>{user.id}</span>
                  <span>{user.username}</span>
                  <span>{user.email}</span>
                </div>
              </div>
          )
        })}
      </div>
  );
}

export default App;
