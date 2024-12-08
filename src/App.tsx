import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import CountryAutoComplete from "./Components/CountryAutoComplete";
import CountryTableControl from "./Components/CountryTableControl";

const customRenderers = [
  ...materialRenderers,
  {
    tester: (uischema: any) =>
      uischema?.options?.customControl === "CountryTableControl" ? 5 : -1,
    renderer: CountryTableControl,
  },
  {
    tester: (uischema: any) =>
      uischema?.options?.customControl === "CountryAutoComplete" ? 4 : -1,
    renderer: CountryAutoComplete,
  },
];

const App: React.FC = () => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string", title: "Nom" },
      countries: {
        type: "array",
        title: "Tableau des pays",
        items: {
          type: "object",
          properties: {
            country: { type: "string", title: "Pays" },
            percentage: { type: "number", title: "Pourcentage" },
          },
        },
      },
    },
  };

  const uischema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/name" },
      {
        type: "Control",
        scope: "#/properties/countries",
        options: { customControl: "CountryTableControl" },
      },
    ],
  };

  const formatData = () => {
    if (!data.countries || data.countries.length === 0) {
      return "Aucune donnée disponible.";
    }

    return data.countries
      .map(
        (entry: { country: string; percentage: number }) =>
          `${entry.country} ${entry.percentage}%`
      )
      .join("\n");
  };

  const initialData = {
    name: "",
    countries: [],
  };

  const [data, setData] = useState(initialData);

  const validatePercentage = () => {
    const total = data.countries.reduce(
      (sum: number, entry: { percentage: number }) =>
        sum + (entry.percentage || 0),
      0
    );
    if (total === 100) {
      alert("Les pourcentages sont valides, le total est de 100% !");
    } else {
      alert(
        `Le total des pourcentages est de ${total}%. Il doit être égal à 100%.`
      );
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Formulaire avec JSONForms</h1>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        onChange={({ data }) => setData(data)}
        renderers={customRenderers}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={validatePercentage} style={{ marginLeft: "10px" }}>
          Valider
        </button>
      </div>
      <pre>{formatData()}</pre>
    </div>
  );
};

export default App;
