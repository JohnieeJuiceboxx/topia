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
}) {
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
              id="outlined-basic"
              label="x"
              defaultValue={xVal}
              variant="outlined"
              type="number"
              margin="normal"
              onChange={(e) =>
                setUserPos({ x: parseInt(e.target.value), y: yVal })
              }
            />
            <TextField
              id="outlined-basic"
              label="y"
              defaultValue={yVal}
              variant="outlined"
              type="number"
              margin="normal"
              onChange={(e) =>
                setUserPos({ x: xVal, y: parseInt(e.target.value) })
              }
            />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Screen Size
          </Typography>
          <div>
            <TextField
              id="outlined-basic"
              label="width"
              defaultValue={xVal}
              variant="outlined"
              type="number"
              margin="normal"
              onChange={(e) =>
                setUserPos({ x: parseInt(e.target.value), y: yVal })
              }
            />
            <TextField
              id="outlined-basic"
              label="height"
              defaultValue={yVal}
              variant="outlined"
              type="number"
              margin="normal"
              onChange={(e) =>
                setUserPos({ x: xVal, y: parseInt(e.target.value) })
              }
            />
          </div>
          <div>
            <Button variant="contained" onClick={() => handleModal(false)}>
              OK
            </Button>
          </div>
        </Box>
      </div>
    </Modal>
  );
}
