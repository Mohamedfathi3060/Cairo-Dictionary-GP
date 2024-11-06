import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import { Divider } from "@mui/material";
import DividerComponent from "../../components/Divider/DividerComponent";

function Section2() {
  return (
    <>
      <h3>المعلومات الصرفية:</h3>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        <Grid size={4}>
          <InputField label={"الاصل اللغوي"} text={true}></InputField>
        </Grid>
        <Grid size={4} sx={{ marginRight: "1px" }}>
          {" "}
          <InputField label={"الفئة الكلامية"} selected={true}></InputField>
        </Grid>
        <Grid size={4}>
          {" "}
          <InputField label={"الصيغة الصرفية"} selected={true}></InputField>
        </Grid>
        <Grid size={4}>
          {" "}
          <InputField label={"المستوى اللغوي"} selected={true}></InputField>
        </Grid>
      </Grid>
      <DividerComponent />
    </>
  );
}

export default Section2;
