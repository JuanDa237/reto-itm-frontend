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
import { CategoryApi } from "../../../api/category.api";

function CategoryList() {
  const navigate = useNavigate();

  const [dialogProps, datatablePros, id, openDialog, wasDeleted] =
    useCanDelete();

  const getData: getDataFn = async (query, setNewData) => {
    try {
      let res = await CategoryApi.getAll(query);
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
        Header: "Cantidad de palabras",
        accessor: "_count",
        Cell: (cellProps: any) => {
          return (
            <WithObjectPath {...cellProps} path="words" defaultValue={0} />
          );
        },
      },
      {
        Header: "Acciones",
        Cell: (cellProps: any) => {
          return (
            <Actions
              onEditClik={() => {
                const rowData = cellProps.row.original;
                navigate(`/admin/category/edit/${rowData.id}`);
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
      await CategoryApi.deleteOne(id);
      notification("success", "La categoría fue eliminada satisfactoriamente");
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
        addLink={"/admin/category/add"}
        {...datatablePros}
      />
    </>
  );
}

export default CategoryList;
