import React, { useState, useEffect } from "react";
import { getActivities, getUsers } from "~auth/authHelper";

function IndexPopup() {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    handleGetUsers();
    handleGetActivities();
  }, []);

  const handleGetUsers = async () => {
    try {
      const data = await getUsers();
      console.log(data)
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetActivities = async () => {
    try {
      const data = await getActivities();
      console.log(data)
      setActivities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const usersWithNoActivity = users.filter(user => !activities.some(activity => activity.user.id === user.id));


  return (
    <div>
      {/* <button onClick={handleGetActivities}>Get User Information</button> */}
      {usersWithNoActivity.map((user) => (
        <div key={user.id}>
          <p>User ID: {user.id}</p>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
        </div>
      ))}
    </div>
  );
}

export default IndexPopup;
