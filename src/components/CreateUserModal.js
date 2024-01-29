import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
export default function CreateUserModal({
  show,
  handleModal,
  xVal,
  yVal,
  setUserPos,
  handleCreateUser,
}) {
  // Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={show} onClose={() => handleModal(false)}>
      <div>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Current Position
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  </Typography> */}
          <div>
            <TextField
              label="x:"
              id="outlined-size-small"
              defaultValue={xVal}
              size="small"
              margin="normal"
              type="number"
              onChange={(e) =>
                setUserPos({ x: parseInt(e.target.value), y: yVal })
              }
            />
          </div>
          <div>
            <TextField
              label="y:"
              id="outlined-size-small"
              defaultValue={yVal}
              size="small"
              margin="normal"
              type="number"
              onChange={(e) =>
                setUserPos({ x: xVal, y: parseInt(e.target.value) })
              }
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                handleCreateUser();
                handleModal(false);
              }}
            >
              OK
            </Button>
          </div>
        </Box>
      </div>
    </Modal>
  );
}
