import "./index.css";
import ButtonCompnent from "./components/Button/ButtonCompnent";
import DividerComponent from "./components/Divider/DividerComponent";
import InputField from "./components/Input/InputField";
import VoiceInput from "./components/Voise";
import { Stack } from "@mui/material";
import Section2 from "./sections/section2/Section2";
import LastSection from "./sections/lastSection/LastSection";
import Section4 from "./sections/Section4/Section4";
function App() {
  return (
    <>
      <Section2></Section2>
      <Section4 />
      <LastSection />
    </>
  );
}

export default App;
