import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

function InputField({ text = false, multiLine = false, selected = false }) {
  const [option, setOption] = useState("");
  const styled = option ? "none" : "block";
  if (text) {
    return (
      <TextField
        id="filled-basic"
        label="ادخل"
        variant="outlined"
        InputLabelProps={{
          sx: {
            right: "25px", // Align label to the right
            textAlign: "right", // Align label text to the right
            transformOrigin: "top right", // Set the origin for label animation
            "&.Mui-focused, &.MuiFormLabel-filled": {
              transform: "translate(8px, 3px) scale(0.95)", // Adjust pop-up animation
            },
            color: "gray", // Default label color
            "&.Mui-focused": {
              color: "#255080",
              fontSize: "16px",
            },
          },
        }}
        sx={{
          "& .MuiFilledInput-root": {
            "&:after": {
              borderBottomColor: "#255080",
              borderBottomWidth: "3px",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#255080",
            },
          },
        }}
      />
    );
  } else if (multiLine) {
    return (
      <TextField
        id="filled-textarea"
        label="ادخل"
        multiline
        variant="filled"
        rows={6}
        maxRows={6}
        InputLabelProps={{
          sx: {
            right: "25px", // Align label to the right
            textAlign: "right", // Align label text to the right
            transformOrigin: "top right", // Set the origin for label animation
            "&.Mui-focused, &.MuiFormLabel-filled": {
              transform: "translate(8px, 3px) scale(0.95)", // Adjust pop-up animation
            },
            color: "gray", // Default label color
            "&.Mui-focused": {
              color: "#255080",
              fontSize: "16px",
            },
          },
        }}
        sx={{
          width: "350px",
          "& .MuiFilledInput-root": {
            "&:after": {
              borderBottomColor: "#255080",
              borderBottomWidth: "3px",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#255080",
            },
          },
        }}
      />
    );
  } else if (selected) {
    return (
      <FormControl
        variant="filled"
        style={{ marginTop: 0 }}
        sx={{
          "& .MuiFilledInput-root": {
            "&:after": {
              borderBottomColor: "#255080",
              borderBottomWidth: "3px",
            },
            right: 0,
          },
          "& .MuiSelect-icon": {
            left: 0, // Moves the arrow to the left
            right: "unset", // Unsets the default right position
          },
          m: 1,
          minWidth: 150,
        }}
      >
        <InputLabel
          id="demo-simple-select-filled-label"
          sx={{
            textAlign: "right", // Align label text to the right
            transformOrigin: "top right", // Set the origin for label animation
            right: "40px",
            fontSize: "16px",
            textAlign: "right", // Aligns text to the left (start)
            direction: "rtl", // Ensures LTR layout for proper alignment
            "&.Mui-focused, &.MuiFormLabel-filled": {
              transform: "translate(8px, 3px) scale(0.95)", // Adjust pop-up animation
            },
            "&.Mui-focused": {
              color: "#255080",
              fontSize: "12px",
            },
          }}
          style={{ display: styled }}
        >
          اختار
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value={10}>اول</MenuItem>
          <MenuItem value={20}>تاني</MenuItem>
          <MenuItem value={30}>تالت</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

export default InputField;
