import { useState } from "react";
import PropTypes from "prop-types";

const SingleInput = ({ input, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onInputChange(input.inputId, event.target.value);
  };

  return (
    <div>
      <label htmlFor={input.inputId}>{input.inputLabel}</label>
      <input
        id={input.inputId}
        name={input.inputName}
        placeholder={input.inputPlaceholder}
        type={input.inputType}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

SingleInput.propTypes = {
  input: PropTypes.shape({
    inputId: PropTypes.string.isRequired,
    inputLabel: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    inputPlaceholder: PropTypes.string,
    inputType: PropTypes.string.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default SingleInput;
