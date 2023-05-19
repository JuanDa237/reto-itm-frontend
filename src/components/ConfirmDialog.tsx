// ----------------------- Components -----------------------
import Button from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ open, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!open) return <></>;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50">
      <div className="flex justify-center items-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12">
        <h3 className="mb-4">¿Deseas eliminar el elemento definitivamente?</h3>
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={onConfirm}
            text="Confirmar"
            className="bg-green-700 hover:bg-green-900"
          />
          <Button
            onClick={onCancel}
            text="Cancelar"
            className="bg-red-500 hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
