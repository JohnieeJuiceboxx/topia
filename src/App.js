import React, { useState, useEffect } from "react";
import "./App.css";
import { UserList } from "./components/UserList";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Logo from "./topia.png";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <div className="logo_container">
        <img src={Logo} className="logo wobble-hor-bottom" />
      </div>
      <UserList showModal={showModal} setShowModal={setShowModal} />
      <Box my={4}>
        <Button
          variant="contained"
          onClick={() => setShowModal(true)}
          className="user_list"
          style={{
            backgroundColor: "#4457ff",
            color: "white",
            fontWeight: 700,
          }}
        >
          User List
        </Button>
      </Box>
    </div>
  );
}

export default App;
