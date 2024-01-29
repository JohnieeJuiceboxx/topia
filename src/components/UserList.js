import React, { useState, useEffect } from "react";
import { USER_LIST } from "../utils/constants";
import CreateUserModal from "./CreateUserModal";
import listUsersInView from "../utils/listUsersInView";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export const UserList = () => {
  const [usersInView, setUsersInView] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userPos, setUserPos] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  // TODO: Create a Modal component with inputs for position and screen size (screen size should default to actual window width and height but be editable).
  // CTA in Modal should close modal, call listUsersInView with updated values, and update usersInView
  // Add a list of the users in view in the render statement below

  useEffect(() => {
    // Set default XY positions
    setUserPos({ x: 800, y: 400 });

    // Set User List aka All Users
    setUsers(USER_LIST);

    // Save screen size to state
    const handleScreenResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    // Add event listener
    window.addEventListener("resize", handleScreenResize);
    // Call right away so state gets updated with screen size dimensions
    handleScreenResize();
    // Remove even listener on clean up
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  useEffect(() => {
    console.log("changes: ", users);
    // everytime there's a change in UsersInView -- update default x/y vals back to 800 and 400 so modal initializes with these values
    setUserPos({ x: 800, y: 400 });
  }, [users]);

  useEffect(() => {
    // on modal close
    if (showModal !== true) {
      setUsersInView(
        listUsersInView(
          users,
          userPos.x,
          userPos.y,
          screenSize.width,
          screenSize.height
        )
      );
    }
  }, [showModal, userPos, screenSize]);

  const handleModal = (bool) => setShowModal(bool);

  const handleCreateUser = () => {
    console.log("___handleCreate___");
    // When User provides valid x,y values -- create new User entry
    if (typeof userPos.x !== NaN && typeof userPos.y !== NaN) {
      const userIdx = Object.keys(users).length + 1;
      const userKey = "user-" + userIdx;

      let userObj = {};
      userObj[userKey] = {};
      userObj[userKey].id = userIdx;
      userObj[userKey].is_broadcaster = true;
      userObj[userKey].username = `user${userIdx}`;
      userObj[userKey].x = userPos.x;
      userObj[userKey].y = userPos.y;

      const updatedList = { ...users, ...userObj };
      setUsers(updatedList);
    }
  };
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Button variant="contained" onClick={() => handleModal(true)}>
          Create User List
        </Button>
      </Box>

      <CreateUserModal
        show={showModal}
        handleModal={handleModal}
        xVal={userPos.x}
        yVal={userPos.y}
        setUserPos={setUserPos}
        handleCreateUser={handleCreateUser}
      />
      <Box my={4}>
        <Typography variant="h5" component="h1" gutterBottom>
          The following Users are currently visible based on position and screen
          size.
        </Typography>
      </Box>
      {usersInView.length === 0 ? (
        <Box my={4}>
          <Typography component="p" gutterBottom>
            There are currently no users within view.
          </Typography>
        </Box>
      ) : (
        <Box my={4}>
          <Typography component="p" gutterBottom>
            DATA present.
          </Typography>
        </Box>
      )}
    </Container>
  );
};
