import { Route, Routes } from "react-router-dom";
import Input from "./Input";
import Output from "./Output";
import CreateInputs from "./CreateInputs";
import AlternateInput from "./AlternateInput";
import AlternateOutput from "./AlternateOutput";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/create" element={<CreateInputs />} />
        <Route path="/cv" element={<Output />} />
        <Route path="/alt" element={<AlternateInput />} />
        <Route path="/altout" element={<AlternateOutput />} />
      </Routes>
    </>
  );
}

export default App;
