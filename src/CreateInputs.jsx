import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateInputs = () => {
  const [categoryType, setCategoryType] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputName, setInputName] = useState("");
  const [singleInput, setSingleInput] = useState([]);
  const [multiInput, setMultiInput] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [fields, setFields] = useState("");
  const [inputFor, setInputFor] = useState("");
  const [inputSets, setInputSets] = useState([]);
  const navigate = useNavigate();

  const handleSingleSubmit = (e) => {
    e.preventDefault();
    const updatedSingleInput = {
      inputName,
      inputLabel,
      inputType,
      inputId,
      inputPlaceholder,
    };
    setSingleInput((prevVal) => [...prevVal, updatedSingleInput]);
    setInputName("");
    setInputLabel("");
    setInputType("");
    setInputId("");
    setInputPlaceholder("");

    const inputData = {
      single: [...singleInput, updatedSingleInput], // Combine existing with new input
      multi: inputSets,
    };
    localStorage.setItem("inputData", JSON.stringify(inputData));
  };

  const handleMultiSubmit = (e) => {
    e.preventDefault();
    const numberOfFields = parseInt(fields);
    const newMultiInput = [inputFor];
    const newInputValues = [];

    for (let i = 0; i < numberOfFields; i++) {
      newInputValues.push("");
    }

    setMultiInput(newMultiInput);
    setInputValues(newInputValues);
  };

  const handleAddInputSet = () => {
    const newInputSet = {
      inputFor,
      inputs: [...inputValues],
    };

    setInputSets((prevSets) => [...prevSets, newInputSet]);

    setInputFor("");
    setInputValues([]);
    setFields("");

    const inputData = {
      single: singleInput,
      multi: [...inputSets, newInputSet],
    };
    localStorage.setItem("inputData", JSON.stringify(inputData));
  };

  const handleInputData = () => {
    const inputData = {
      single: singleInput,
      multi: inputSets,
    };
    localStorage.setItem("inputData", JSON.stringify(inputData));
    navigate("/alt");
  };

  return (
    <div>
      <form>
        <input
          type="radio"
          id="single"
          name="category"
          value="single"
          onChange={(e) => setCategoryType(e.target.value)}
        />
        <label htmlFor="single">Input with Single Field</label>
        <input
          type="radio"
          id="multiple"
          name="category"
          value="multiple"
          onChange={(e) => setCategoryType(e.target.value)}
        />
        <label htmlFor="multiple">Input with Multiple Fields</label>
      </form>
      {categoryType === "single" ? (
        <form onSubmit={handleSingleSubmit}>
          <input
            type="text"
            placeholder="Input Label"
            id="input-label"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
          />
          <input
            type="text"
            placeholder="Input Type"
            id="input-type"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Input Id"
            id="input-id"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Input Placeholder"
            id="input-placeholder"
            value={inputPlaceholder}
            onChange={(e) => setInputPlaceholder(e.target.value)}
          />
          <input
            type="text"
            placeholder="Input Name"
            id="input-name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <button>Add Input</button>
        </form>
      ) : categoryType === "multiple" ? (
        <div>
          <form onSubmit={handleMultiSubmit}>
            <input
              type="number"
              id="fields"
              placeholder="Enter Number of Fields"
              value={fields}
              onChange={(e) => setFields(e.target.value)}
            />
            <input
              type="text"
              id="inputsFor"
              placeholder="Inputs For..."
              value={inputFor}
              onChange={(e) => setInputFor(e.target.value)}
            />
            <button>Generate</button>
          </form>
          {inputValues.map((value, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Enter field name ${index + 1}`}
              value={value}
              onChange={(e) => {
                const newInputValues = [...inputValues];
                newInputValues[index] = e.target.value;
                setInputValues(newInputValues);
              }}
            />
          ))}
          <button onClick={handleAddInputSet}>Add Input Set</button>
          <button onClick={handleInputData}>Submit Inputs</button>
        </div>
      ) : null}
    </div>
  );
};

export default CreateInputs;
