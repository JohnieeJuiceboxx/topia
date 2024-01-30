import React, { useState, useEffect } from "react";
import { USER_LIST } from "../utils/constants";
import CreateUserModal from "./CreateUserModal";
import listUsersInView from "../utils/listUsersInView";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export const UserList = ({ showModal, setShowModal }) => {
  const [usersInView, setUsersInView] = useState([]);
  const [users, setUsers] = useState([]);
  const [userPos, setUserPos] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  // TODO: Create a Modal component with inputs for position and screen size (screen size should default to actual window width and height but be editable).
  // CTA in Modal should close modal, call listUsersInView with updated values, and update usersInView
  // Add a list of the users in view in the render statement below

  // Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
    // on modal open
    if (showModal) {
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

  return (
    <div>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography
            id="modal-modal-title"
            align="left"
            variant="h5"
            component="h2"
          >
            Current Position
          </Typography>

          <div className="input_container">
            <TextField
              id="outlined-basic"
              label="x"
              value={userPos.x}
              variant="outlined"
              type="number"
              margin="normal"
              onChange={(e) =>
                setUserPos({ x: parseInt(e.target.value), y: userPos.y })
              }
              inputProps={{
                sx: { fontSize: "13px", marginTop: "4px" },
              }}
              InputLabelProps={{
                shrink: true,
                sx: {
                  fontSize: "12px",
                  bottom: "20px",
                },
              }}
            />
            <TextField
              id="outlined-basic"
              label="y"
              value={userPos.y}
              variant="outlined"
              type="number"
              margin="normal"
              onChange={(e) =>
                setUserPos({ x: userPos.x, y: parseInt(e.target.value) })
              }
            />
          </div>
          <Typography
            id="modal-modal-title"
            align="left"
            variant="h5"
            component="h2"
          >
            Screen Size
          </Typography>
          <div className="input_container">
            <TextField
              id="outlined-basic"
              label="width"
              value={screenSize.width}
              variant="outlined"
              type="number"
              margin="normal"
              onChange={(e) =>
                setScreenSize({
                  width: parseInt(e.target.value),
                  height: screenSize.height,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="height"
              value={screenSize.height}
              variant="outlined"
              type="number"
              margin="normal"
              onChange={(e) =>
                setScreenSize({
                  width: screenSize.width,
                  height: parseInt(e.target.value),
                })
              }
            />
          </div>
        </Box>
      </Container>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={style}>
          <Container maxWidth="md">
            <Box my={4}>
              <Typography variant="h5" component="h1" gutterBottom>
                The following Users are currently visible based on position and
                screen size.
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
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Distance</TableCell>
                        <TableCell align="right">Broadcaster</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usersInView.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.username}
                          </TableCell>
                          <TableCell align="right">{row.distance}</TableCell>
                          <TableCell align="right">
                            {row.is_broadcaster ? "yes" : "no"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Container>
          {/* <div>
            <Button variant="contained" onClick={() => setShowModal(false)}>
              OK
            </Button>
          </div> */}
        </Box>
      </Modal>
    </div>
  );
};
