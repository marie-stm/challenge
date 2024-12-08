import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const countriesList = ["France", "Belgique", "Allemagne", "Inconnu"];

const CountryAutoComplete: React.FC<{
  data: string;
  handleChange: (value: string | null) => void;
}> = ({ data, handleChange }) => {
  return (
    <Autocomplete
      options={countriesList}
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField {...params} label="Pays" />}
      value={data || ""}
      onChange={(event, value) => handleChange(value)}
    />
  );
};

export default CountryAutoComplete;
