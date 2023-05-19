// ----------------------- React -----------------------
import { useEffect, useState } from "react";
// ----------------------- Libraries -----------------------
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
// ----------------------- Components -----------------------
import Table, { Column } from "./Table";
import TablePagination from "./TablePagination";
import Filter from "./Filter";
// ----------------------- Interfaces -----------------------
import { QueryParams } from "../../api/common.api";

export type getDataFn = (
  query: QueryParams,
  setNewData: (newData: NewData) => void
) => void;

interface FunctionalTableProps {
  getData: getDataFn;
  columns: Column[];
  addLink?: string;
  fatherRef?: React.Ref<any>;
}

export interface NewData {
  totalItems: number;
  data: any[];
}

export function DataTable({
  getData,
  columns,
  addLink,
  fatherRef,
}: FunctionalTableProps) {
  const rowsPerPage = 10;
  const [data, setData] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState<string | null>(null);

  const setNewData = (newData: NewData) => {
    setData(newData.data);
    setTotalItems(newData.totalItems);
  };

  useEffect(() => {
    if (!filter) return;

    getData(
      {
        limit: rowsPerPage,
        offset: 0,
        q: filter,
      },
      setNewData
    );
  }, [filter]);

  return (
    <>
      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-2">
        {addLink && (
          <Link
            className="md:w-1/2 flex justify-center items-center px-4 py-2 text-sm font-medium rounded text-white bg-green-700 hover:bg-green-900 border border-gray-200"
            to={addLink}
          >
            <FontAwesomeIcon
              className="text-white pr-2"
              icon={faPlusSquare}
            ></FontAwesomeIcon>
            Añadir
          </Link>
        )}

        {!addLink && <div></div>}
        <Filter
          onFilterChange={(filter) => {
            setFilter(filter);
          }}
        />
      </div>
      <Table columns={columns} data={data} />
      <TablePagination
        totalItems={totalItems}
        rowsPerPage={rowsPerPage}
        pageChangeHandler={(limit, offset) => {
          getData(
            {
              limit,
              offset,
              q: filter || "",
            },
            setNewData
          );
        }}
        fatherRef={fatherRef}
      />
    </>
  );
}
