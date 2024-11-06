import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function ButtonCompnent({ text = "فارغ", rounded = false, icon = false }) {
  const roundedStyle = rounded ? { borderRadius: "20px" } : {};
  return (
    <Button
      variant="contained"
      sx={{
        background: "linear-gradient(to right, #0F2D4D, #2369B3)",
        fontSize: "16px",
        fontFamily: "El Messiri",
      }}
      startIcon={icon && <AddIcon sx={{ marginLeft: "10px" }} />}
      style={roundedStyle}
    >
      {text}
    </Button>
  );
}

export default ButtonCompnent;
