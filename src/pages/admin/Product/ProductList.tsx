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
import { ProductApi } from "../../../api/product.api";

function ProductList() {
  const navigate = useNavigate();

  const [dialogProps, datatablePros, id, openDialog, wasDeleted] =
    useCanDelete();

  const getData: getDataFn = async (query, setNewData) => {
    try {
      let res = await ProductApi.getAll(query);
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
        Header: "Descripcion",
        accessor: "description",
        Cell: (cellProps: any) => {
          return <General {...cellProps} />;
        },
      },
      {
        Header: "Precio",
        accessor: "price",
        Cell: (cellProps: any) => {
          return <General {...cellProps} />;
        },
      },
      {
        Header: "Categoria",
        accessor: "category",
        Cell: (cellProps: any) => {
          return <WithObjectPath {...cellProps} path="name" defaultValue={""} />
        },
      },
      {
        Header: "Acciones",
        Cell: (cellProps: any) => {
          return (
            <Actions
              onEditClik={() => {
                const rowData = cellProps.row.original;
                navigate(`/admin/product/edit/${rowData.id}`);
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
      await ProductApi.deleteOne(id);
      notification("success", "La producto fue eliminada satisfactoriamente");
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
        addLink={"/admin/product/add"}
        {...datatablePros}
      />
    </>
  );
}

export default ProductList;
