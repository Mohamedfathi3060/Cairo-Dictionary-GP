import {
  Box,
  Container,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import login_background from "../../assets/images/login_background.png";

export default function Login() {
  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems={{ xs: "center", lg: "initial" }}
      display={{ xs: "flex" }}
      color={"#FFFFFF"}
      height={"100vh"}
      sx={{
        background: {
          lg: `url(${login_background}) no-repeat`,
        },
        backgroundSize: { lg: "contain" },
        backgroundPositionY: { lg: "100%" },
      }}
    >
      <Stack
        spacing={3}
        my={4}
        p={4}
        sx={{
          background: "#1A3553",
          borderRadius: { sm: "5px" },
          textAlign: "center",
        }}
        height={{ xs: "50%", sm: "40%", lg: "40%" }}
        width={{ xs: "70%", sm: "60%", lg: "25%" }}
      >
        <Typography variant="h2" fontFamily={"El Messiri"}>
          تسجيل الدخول
        </Typography>
        <InputField label="اسم المستخدم" text={true} />
        <InputField label="كلمة المرور" text={true} type="password" />
        <Stack sx={{ width: "50%", margin: "auto auto 0 auto !important" }}>
          <ButtonCompnent text="الدخول" />
        </Stack>
      </Stack>
    </Grid2>
  );
}
