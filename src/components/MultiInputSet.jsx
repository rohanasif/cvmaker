import { useState } from "react";
import PropTypes from "prop-types";

const MultiInputSet = ({ set, addSet, removeSet, onInputChange }) => {
  const [inputs, setInputs] = useState(set.inputs.map(() => ""));

  const handleChange = (inputIndex, event) => {
    const newInputs = [...inputs];
    newInputs[inputIndex] = event.target.value;
    setInputs(newInputs);
    onInputChange(inputIndex, event.target.value);
  };

  return (
    <div>
      <h3 className="text-3xl">{set.inputFor}:</h3>
      {set.inputs.map((input, inputIndex) => (
        <div key={inputIndex}>
          <label htmlFor={input}>{input}</label>
          <input
            type="text"
            id={input}
            value={inputs[inputIndex]}
            onChange={(event) => handleChange(inputIndex, event)}
          />
        </div>
      ))}
      <button
        onClick={() => addSet(set.inputFor)}
        className="border-2 border-black"
        type="button"
      >
        {`Add ${set.inputFor}`}
      </button>
      <button
        onClick={removeSet}
        className="border-2 border-black"
        type="button"
      >
        {`Remove ${set.inputFor}`}
      </button>
    </div>
  );
};

MultiInputSet.propTypes = {
  set: PropTypes.shape({
    inputFor: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  addSet: PropTypes.func.isRequired,
  removeSet: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default MultiInputSet;
