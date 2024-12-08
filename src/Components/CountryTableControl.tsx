import React from "react";
import { withJsonFormsArrayControlProps } from "@jsonforms/react";
import { TextField, IconButton, Autocomplete, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const countriesList = ["France", "Belgique", "Allemagne", "Inconnu"];

const CountryTableControl = ({ data, handleChange, path }: any) => {
  const handleCountryChange = (index: number, value: string | null) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], country: value };
    handleChange(path, updatedData);
  };

  const handlePercentageChange = (index: number, value: number) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], percentage: value };

    const total = updatedData.reduce(
      (sum, item) => sum + (item.percentage || 0),
      0
    );
    if (total > 100) {
      alert("Le total des pourcentages ne peut pas dépasser 100 % !");
    }
    handleChange(path, updatedData);
  };

  const handleAddRow = () => {
    const total = data.reduce(
      (sum: any, item: { percentage: any }) => sum + (item.percentage || 0),
      0
    );
    if (total >= 100) {
      alert(
        "Impossible d'ajouter une nouvelle ligne, le total est déjà à 100 %."
      );
      return;
    }
    const updatedData = [...data, { country: "", percentage: 0 }];
    handleChange(path, updatedData);
  };

  const handleDeleteRow = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    handleChange(path, updatedData);
  };

  const totalPercentage = data.reduce(
    (sum: any, item: { percentage: any }) => sum + (item.percentage || 0),
    0
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pays</th>
            <th>Pourcentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index}>
              <td>
                <Autocomplete
                  options={countriesList}
                  value={item.country || ""}
                  onChange={(event, value) => handleCountryChange(index, value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Pays" />
                  )}
                />
              </td>
              <td>
                <TextField
                  type="number"
                  value={item.percentage || ""}
                  onChange={(event) =>
                    handlePercentageChange(index, Number(event.target.value))
                  }
                />
              </td>
              <td>
                <IconButton onClick={() => handleDeleteRow(index)}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Ajouter une ligne</button>
      <Typography variant="h6" style={{ marginTop: "10px" }}>
        Total : {totalPercentage} %
      </Typography>
      {totalPercentage !== 100 && (
        <Typography color="error">
          Le total des pourcentages doit être égal à 100 % !
        </Typography>
      )}
    </div>
  );
};

export default withJsonFormsArrayControlProps(CountryTableControl);
