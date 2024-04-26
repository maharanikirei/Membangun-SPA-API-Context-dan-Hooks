import { useState } from "react";

function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const Changehandle = (event) => {
    setValue(event.target.value);
  };

  return [value, Changehandle];
}

export default useInput;
