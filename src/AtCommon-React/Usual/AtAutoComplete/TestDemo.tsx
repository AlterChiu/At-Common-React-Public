import React, { ChangeEvent } from "react";
import { AutocompleteRenderInputParams, SelectChangeEvent } from "@mui/material";
import AtInput from "../AtInput/AtInput";
import AtAutoComplete from "../AtAutoComplete/AtAutoComplete";
import { AutoCompleteRef } from "./Model/AtAutoCompleteModel";
import { TestDemo as SelectionDemo } from "../AtSelection/TestDemo";

const TestDemo = () => {
  return <>{SelectionDemo()}</>
};
export default TestDemo;
