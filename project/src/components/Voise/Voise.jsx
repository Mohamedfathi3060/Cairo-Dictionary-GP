import React, { useState, useRef } from "react";
import { Button, IconButton, Stack } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    setIsRecording(true);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
    };

    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <Stack flexDirection={"row"}>
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(to right, #0F2D4D, #2369B3)",
          borderRadius: "20px",
          padding: "1rem",
          width: "120px",
          color: "#FFFFFF",
          fontSize: "16px",
          fontFamily: "El Messiri",
        }}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? (
          <span style={{ fontSize: "20px" }}>انهاء</span>
        ) : (
          <span style={{ fontSize: "20px" }}>النطق</span>
        )}

        <IconButton>
          {isRecording ? (
            <StopIcon sx={{ color: "#E72929", fontSize: "30px" }} />
          ) : (
            <MicIcon sx={{ color: "white", fontSize: "30px" }} />
          )}
        </IconButton>
      </Button>
      {audioURL && (
        <Button
          variant="outlined"
          sx={{
            marginRight: "20px",
            borderRadius: "20px",
            color: "white", // Text color
            fontSize: "16px",
            fontFamily: "El Messiri",
            borderColor: "#2369B3", // Border color
            borderWidth: "2px",
          }}
          onClick={() => new Audio(audioURL).play()}
        >
          <span
            style={{ color: "black", fontSize: "20px", marginLeft: "15px" }}
          >
            استمع
          </span>
          <PlayArrowIcon sx={{ color: "black", fontSize: "30px" }} />
        </Button>
      )}
    </Stack>
  );
};

export default VoiceRecorder;
