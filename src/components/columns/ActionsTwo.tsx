import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ActionsTwoProps {
  onActiveClik: () => void;
  onDeleteClik: () => void;
}

export function ActionsTwo({ onActiveClik, onDeleteClik }: ActionsTwoProps) {
  return (
    <div className="inline-flex rounded-md" role="group">
      <button
        type="button"
        className="px-4 py-2 text-sm font-medium rounded-l-lg text-white bg-blue-500 hover:bg-blue-700 border border-gray-200"
        onClick={onActiveClik}
      >
        <FontAwesomeIcon
          className="text-white pr-2"
          icon={faTrashRestore}
        ></FontAwesomeIcon>
        Restaurar
      </button>
      <button
        type="button"
        className="px-4 py-2 text-sm font-medium rounded-r-md text-white bg-red-500 hover:bg-red-700 border border-gray-200"
        onClick={onDeleteClik}
      >
        <FontAwesomeIcon
          className="text-white pr-2"
          icon={faTrash}
        ></FontAwesomeIcon>
        Eliminar Definitivamente
      </button>
    </div>
  );
}
