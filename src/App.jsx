import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  TextField,
  FormControlLabel,
  Checkbox,
  Switch,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  Slider,
  Typography,
} from "@mui/material";

export default function App() {
  const [formData, setFormData] = useState([]);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://8x2nxg-8080.csb.app") // Ensure this URL is correct and the server is properly configured for CORS
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.dir(data);
        setFormData(data); // Assuming the data is the array of forms directly
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  function renderComponent(row, index) {
    switch (row.componentType) {
      case "TextField":
        return (
          <TextField
            key={index}
            label={row.label}
            required={row.isRequired}
            variant="outlined"
            fullWidth
          />
        );
      case "Checkbox":
        return (
          <FormControlLabel
            key={index}
            control={<Checkbox />}
            label={row.label}
          />
        );
      case "Switch":
        return (
          <FormControlLabel
            key={index}
            control={<Switch />}
            label={row.label}
          />
        );
      case "RadioGroup":
        return (
          <FormControl component="fieldset" key={index}>
            <FormLabel component="legend">{row.label}</FormLabel>
            <RadioGroup row>
              {row.options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case "Select":
        return (
          <TextField
            key={index}
            select
            label={row.label}
            fullWidth
            variant="outlined"
          >
            {row.options.map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        );
      case "Slider":
        return (
          <Box key={index} width="100%" maxWidth={300}>
            <Typography gutterBottom>{row.label}</Typography>
            <Slider
              defaultValue={row.min}
              step={row.step}
              min={row.min}
              max={row.max}
              marks
              valueLabelDisplay="auto"
            />
          </Box>
        );
      default:
        return null;
    }
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        margin: 2,
      }}
    >
      {formData[currentFormIndex] &&
        formData[currentFormIndex].rows.map(renderComponent)}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() =>
            setCurrentFormIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          }
          disabled={currentFormIndex === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            setCurrentFormIndex((prevIndex) =>
              Math.min(prevIndex + 1, formData.length - 1),
            )
          }
          disabled={currentFormIndex >= formData.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
