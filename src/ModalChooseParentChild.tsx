import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { useState } from "react";
import type { Position } from "./types/Position";

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
type Level = {
  id: number;
  level: number;
  currentPositions: Position[];
};

type ModalChooseParentChildProps = {
  open: boolean;
  handleClose: () => void;
  hierarchy: Level[];
  level: number;
  onSubmit: (parent: { id: number | null; name: string }) => void;
  name: string;
};
export default function ModalChooseParentChild({
  open,
  handleClose,
  hierarchy,
  level,
  onSubmit,
  name,
}: ModalChooseParentChildProps) {
  const [selectedParent, setSelectedParent] = useState<{
    id: number | null;
    name: string;
  } | null>(null);

  const isSelected = (id: number | null) => selectedParent?.id === id;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ color: "error.dark", fontWeight: 600 }}>
          Select Parent for: {name}
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Please select a parent node from Level {level}
        </Typography>

        {/* PARENT LIST */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 3 }}>
          {level === 1 ? (
            <Box
              role="button"
              tabIndex={0}
              onClick={() => setSelectedParent({ id: null, name: "Base Case" })}
              sx={{
                cursor: "pointer",
                borderRadius: 999,
                px: 3,
                py: 1,
                textAlign: "center",
                border: "2px solid",
                borderColor: isSelected(null) ? "error.main" : "#6b003b",
                color: isSelected(null) ? "white" : "#6b003b",
                backgroundColor: isSelected(null)
                  ? "error.main"
                  : "transparent",
              }}
            >
              Base Case (Level 1)
            </Box>
          ) : (
            hierarchy[level - 2]?.currentPositions.map((it) => (
              <Box
                key={it.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedParent({ id: it.id, name: it.name })}
                sx={{
                  cursor: "pointer",
                  borderRadius: 999,
                  px: 3,
                  py: 1,
                  textAlign: "center",
                  border: "2px solid",
                  borderColor: isSelected(it.id) ? "error.main" : "#6b003b",
                  color: isSelected(it.id) ? "white" : "#6b003b",
                  backgroundColor: isSelected(it.id)
                    ? "error.main"
                    : "transparent",
                }}
              >
                {it.name}
              </Box>
            ))
          )}
        </Box>

        <Divider sx={{ my: 3, borderBottomWidth: 2 }} />

        {/* PERMISSIONS (unchanged) */}
        <Typography variant="body2">Permissions</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
          }}
        >
          <FormControlLabel
            control={<Checkbox color="error" />}
            label="Approve Leave"
          />
          <FormControlLabel
            control={<Checkbox color="error" />}
            label="View Leave"
          />
          <FormControlLabel
            control={<Checkbox color="error" />}
            label="Approve Expense"
          />
          <FormControlLabel
            control={<Checkbox color="error" />}
            label="View Expense"
          />
        </Box>

        <Divider sx={{ mt: 4 }} />

        {/* ACTIONS */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setSelectedParent(null);
              handleClose();
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            disabled={!selectedParent}
            onClick={() => {
              onSubmit(selectedParent!);
              setSelectedParent(null);
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
