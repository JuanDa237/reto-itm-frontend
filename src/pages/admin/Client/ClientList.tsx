// ----------------------- React -----------------------
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
// ----------------------- Components -----------------------
import { DataTable, getDataFn, Column } from "../../../components/Table";
import { General, Actions, WithObjectPath } from "../../../components/columns";
import ConfirmDialog from "../../../components/ConfirmDialog";
// ----------------------- Hooks -----------------------
import { useCanDelete } from "../../../common/hooks/useCanDelete";
// ----------------------- Functions -----------------------
import { notification } from "../../../common/functions/notification";
// ----------------------- Api -----------------------
import { ClientApi } from "../../../api/client.api";

function ClientList() {
  const navigate = useNavigate();

  const [dialogProps, datatablePros, id, openDialog, wasDeleted] =
    useCanDelete();

  const getData: getDataFn = async (query, setNewData) => {
    try {
      let res = await ClientApi.getAll(query);
      setNewData(res);
    } catch (error: any) {
      notification("error", error.message);
    }
  };

  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
        Cell: (cellProps: any) => {
          return <General {...cellProps} />;
        },
      },
      {
        Header: "Acciones",
        Cell: (cellProps: any) => {
          return (
            <Actions
              onEditClik={() => {
                const rowData = cellProps.row.original;
                navigate(`/admin/client/edit/${rowData.id}`);
              }}
              onDeleteClik={() => {
                openDialog(cellProps.row.original.id);
              }}
            />
          );
        },
      },
    ],
    []
  );

  const onDelete = async () => {
    if (!id) return;

    try {
      await ClientApi.deleteOne(id);
      notification("success", "La categoria fue eliminada satisfactoriamente");
      wasDeleted();
    } catch (error: any) {
      notification("error", error.message);
    }
  };


  return (
    <>
      <ConfirmDialog {...dialogProps} onConfirm={onDelete} />
      <DataTable
        columns={columns}
        getData={getData}
        addLink={"/admin/client/add"}
        {...datatablePros}
      />
    </>
  );
}

export default ClientList;
