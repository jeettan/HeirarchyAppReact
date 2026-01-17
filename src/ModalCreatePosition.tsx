import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";

type ModalCreatePositionProps = {
  open: boolean;
  handleClose: () => void;
  addPosition: () => void;
  setPositionNameCurrent: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalCreatePosition({
  open,
  handleClose,
  addPosition,
  setPositionNameCurrent,
  department,
  setDepartment,
}: ModalCreatePositionProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "error.dark", fontWeight: 600 }}
        >
          Create New Position
        </Typography>
        <Divider />
        <Typography id="" variant="subtitle2" sx={{ mt: 2 }}>
          Name<span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setPositionNameCurrent(e.target.value)}
        />
        <Typography id="" variant="subtitle2" sx={{ mt: 2 }}>
          Name (Thai)
        </Typography>
        <TextField label="Name" variant="outlined" size="small" fullWidth />
        <Typography id="modal-modal-title" variant="subtitle2" sx={{ mt: 2 }}>
          Name (Chinese)
        </Typography>
        <TextField label="Name" variant="outlined" fullWidth size="small" />
        <Typography id="modal-modal-title" variant="subtitle2" sx={{ mt: 2 }}>
          Name (Vietnamese)
        </Typography>
        <TextField label="Name" variant="outlined" fullWidth size="small" />

        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Section
        </Typography>

        <Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          size="small"
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select department
          </MenuItem>
          <MenuItem value="it">IT</MenuItem>
          <MenuItem value="hr">HR</MenuItem>
          <MenuItem value="finance">Finance</MenuItem>
        </Select>

        <Typography id="modal-modal-title" variant="subtitle2" sx={{ mt: 2 }}>
          Salary Type<span style={{ color: "#f44336" }}>*</span>
        </Typography>

        <RadioGroup row>
          <FormControlLabel
            value="fulltime"
            control={<Radio color="error" />}
            label="Normal"
          />
          <FormControlLabel
            value="parttime"
            control={<Radio color="error" />}
            label="Commission"
          />
        </RadioGroup>
        <Divider />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            marginTop: "10px", // or 'space-between'
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "red",
              color: "red",
              backgroundColor: "white",
              borderRadius: 999, // fully rounded (pill)
              textTransform: "none",
              px: 3,
              "&:hover": {
                borderColor: "darkred",
                backgroundColor: "#fff",
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{
              borderRadius: 999,
              textTransform: "none",
              px: 3,
            }}
            onClick={addPosition}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
