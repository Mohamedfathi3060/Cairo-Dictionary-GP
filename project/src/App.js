import "./index.css";
import ButtonCompnent from "./components/Button/ButtonCompnent";
import DividerComponent from "./components/Divider/DividerComponent";
import InputField from "./components/Input/InputField";
import VoiceInput from "./components/Voise";
import { Stack } from "@mui/material";
function App() {
  return (
    <>
      <ButtonCompnent text={"المدونة"} icon={true} />

      <DividerComponent />
      <Stack flexDirection={"row"}>
        <InputField text={true} />
        <InputField selected={true} />
        <InputField multiLine={true} />
      </Stack>

      <VoiceInput />
    </>
  );
}

export default App;
