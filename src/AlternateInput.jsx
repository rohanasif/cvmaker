import { useState, useEffect } from "react";
import SingleInput from "./components/SingleInput";
import MultiInputSet from "./components/MultiInputSet";
import { useNavigate } from "react-router-dom";

const AlternateInput = () => {
  const [inputs] = useState(JSON.parse(localStorage.getItem("inputData")));
  const [singleInputs] = useState(inputs.single);
  const [multiInputs, setMultiInputs] = useState(inputs.multi);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    navigate("/altout");
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const updateLocalStorage = (newMultiInputs) => {
    const updatedData = {
      single: singleInputs,
      multi: newMultiInputs,
    };
    localStorage.setItem("inputData", JSON.stringify(updatedData));
  };

  const addSet = (inputFor) => {
    const setToDuplicate = multiInputs.find((set) => set.inputFor === inputFor);
    if (setToDuplicate) {
      const newMultiInputs = [...multiInputs];
      newMultiInputs.push({ ...setToDuplicate });
      setMultiInputs(newMultiInputs);
      updateLocalStorage(newMultiInputs);
    }
  };

  const removeSet = (inputFor, setIndex) => {
    if (multiInputs.length > 1) {
      const newMultiInputs = multiInputs.filter(
        (set, index) => !(set.inputFor === inputFor && index === setIndex)
      );
      setMultiInputs(newMultiInputs);
      updateLocalStorage(newMultiInputs);
    }
  };

  const handleInputChange = (inputId, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [inputId]: value }));
  };

  const handleMultiInputChange = (inputFor, inputIndex, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [inputFor]: {
        ...(prevFormData[inputFor] || {}),
        [inputIndex]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-3xl">Single Inputs</h3>
      {singleInputs.map((singleInput, index) => (
        <SingleInput
          key={index}
          input={singleInput}
          onInputChange={handleInputChange}
        />
      ))}
      {multiInputs.map((set, setIndex) => (
        <MultiInputSet
          key={setIndex}
          set={set}
          addSet={() => addSet(set.inputFor)}
          removeSet={() => removeSet(set.inputFor, setIndex)}
          onInputChange={(inputIndex, value) =>
            handleMultiInputChange(set.inputFor, inputIndex, value)
          }
        />
      ))}
      <button type="submit">View CV</button>
    </form>
  );
};

export default AlternateInput;
