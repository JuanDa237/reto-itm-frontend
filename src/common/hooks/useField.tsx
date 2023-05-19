import { useCallback, useState } from "react";

interface useFieldParams {
  name: string;
  type: string;
  defaultValue?: any;
  onKeyDown?: (event: any) => void;
}

export const useField = ({
  name = "",
  type = "",
  defaultValue = "",
  onKeyDown,
}: useFieldParams) => {
  const [value, setValue] = useState(defaultValue);

  const setValueExport = useCallback((newValue: any) => setValue(newValue), []);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return [
    {
      id: name,
      name,
      type,
      value,
      onChange,
      onKeyDown,
    },
    setValueExport,
  ] as const;
};
