import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const formData = {
  forms: [
    {
      rows: [
        {
          label: "First Name",
          component: {
            type: "TextField",
            props: { variant: "outlined", fullWidth: true },
          },
        },
        {
          label: "Last Name",
          component: {
            type: "TextField",
            props: { variant: "outlined", fullWidth: true },
          },
        },
        {
          label: "Gender",
          component: {
            type: "RadioGroup",
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ],
          },
        },
        {
          label: "Newsletter Subscription",
          component: { type: "Switch" },
        },
      ],
    },
    {
      rows: [
        {
          label: "Email Address",
          component: {
            type: "TextField",
            props: { variant: "outlined", fullWidth: true },
          },
        },
        {
          label: "Password",
          component: {
            type: "TextField",
            props: { variant: "outlined", fullWidth: true, type: "password" },
          },
        },
        {
          label: "Remember Me",
          component: { type: "Checkbox" },
        },
        {
          label: "Age",
          component: {
            type: "Slider",
            props: {
              defaultValue: 25,
              step: 5,
              min: 18,
              max: 100,
              valueLabelDisplay: "auto",
            },
          },
        },
      ],
    },
    {
      rows: [
        {
          label: "Country",
          component: {
            type: "Select",
            options: [
              { label: "USA", value: "USA" },
              { label: "Canada", value: "Canada" },
              { label: "Mexico", value: "Mexico" },
            ],
          },
        },
        {
          label: "City",
          component: {
            type: "TextField",
            props: { variant: "outlined", fullWidth: true },
          },
        },
        {
          label: "Address",
          component: {
            type: "TextField",
            props: { variant: "outlined", fullWidth: true },
          },
        },
      ],
    },
    {
      rows: [
        {
          label: "Feedback",
          component: {
            type: "TextField",
            props: {
              variant: "outlined",
              fullWidth: true,
              multiline: true,
              rows: 4,
            },
          },
        },
        {
          label: "How did you hear about us?",
          component: {
            type: "Select",
            options: [
              { label: "Online", value: "online" },
              { label: "Friend", value: "friend" },
              { label: "Advertisement", value: "advertisement" },
            ],
          },
        },
        {
          label: "Terms and Conditions",
          component: { type: "Checkbox" },
        },
      ],
    },
  ],
};

function renderComponent(row, index) {
  switch (row.component.type) {
    case "TextField":
      return (
        <TextField key={index} label={row.label} {...row.component.props} />
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
        <FormControlLabel key={index} control={<Switch />} label={row.label} />
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
          {row.component.options.map((option, idx) => (
            <MenuItem key={idx} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    case "Slider":
      return (
        <Box key={index} width="100%" maxWidth={300}>
          <Typography gutterBottom>{row.label}</Typography>
          <Slider {...row.component.props} />
        </Box>
      );
    case "RadioGroup":
      return (
        <FormControl key={index} component="fieldset">
          <FormLabel component="legend">{row.label}</FormLabel>
          <RadioGroup row>
            {row.component.options.map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    default:
      return null;
  }
}

export default function App() {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  const handleNext = () =>
    setCurrentFormIndex((prevIndex) =>
      Math.min(prevIndex + 1, formData.forms.length - 1),
    );
  const handleBack = () =>
    setCurrentFormIndex((prevIndex) => Math.max(prevIndex - 1, 0));

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
      {formData.forms[currentFormIndex].rows.map(renderComponent)}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={currentFormIndex === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentFormIndex >= formData.forms.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
