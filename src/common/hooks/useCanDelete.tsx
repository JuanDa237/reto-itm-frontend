import { useRef, useState } from "react";

export const useCanDelete = () => {
  const [open, setOpen] = useState(false);
  const datatableRef = useRef<any>();
  const selectedId = useRef<string>();

  const openDialog = (id: string) => {
    setOpen(true);
    selectedId.current = id;
  };

  const wasDeleted = () => {
    selectedId.current = "";
    datatableRef.current.itemDeleted();
    setOpen(false);
  };

  return [
    {
      open,
      onCancel: () => {
        setOpen(false);
      },
    },
    {
      fatherRef: datatableRef,
    },
    selectedId.current, // Id
    openDialog,
    wasDeleted,
  ] as const;
};
