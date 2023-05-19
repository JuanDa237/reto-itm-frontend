import { useCallback, useState } from "react";

interface useSelectParams {
  name: string;
  defaultValue?: string;
}

export const useSelect = ({
  name = "",
  defaultValue = "",
}: useSelectParams) => {
  const [value, setValue] = useState(defaultValue);

  const setValueExport = useCallback((newValue: any) => setValue(newValue), []);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return [
    {
      id: name,
      name,
      value,
      onChange,
    },
    setValueExport,
  ] as const;
};
