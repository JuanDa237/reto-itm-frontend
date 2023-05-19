// ----------------------- React -----------------------
import { useEffect, useImperativeHandle, useState } from "react";
// ----------------------- Libraries -----------------------
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TablePaginationProps {
  pageChangeHandler: (limit: number, offset: number) => void;
  totalItems: number;
  rowsPerPage: number;
  fatherRef?: React.Ref<any>;
}

function TablePagination({
  pageChangeHandler,
  totalItems,
  rowsPerPage,
  fatherRef,
}: TablePaginationProps) {
  // Calculating max number of pages
  const noOfPages = Math.ceil(totalItems / rowsPerPage);

  // State variable to hold the current page. This value is
  // passed to the callback provided by the parent
  const [currentPage, setCurrentPage] = useState(1);

  // Navigation arrows enable/disable state
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  // Onclick handlers for the butons
  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);

  // If number of pages changes, set default current page
  useEffect(() => {
    setCurrentPage(1);
  }, [noOfPages]);

  // Disable previous and next buttons in the first and last page
  // respectively
  useEffect(() => {
    setCanGoBack(currentPage > 1);
    setCanGoNext(currentPage < noOfPages);
  }, [noOfPages, currentPage]);

  // To set the starting index of the page
  useEffect(() => {
    pageChangeHandler(rowsPerPage, currentPage - 1);
  }, [currentPage]);

  useImperativeHandle(fatherRef, () => ({
    itemDeleted() {
      pageChangeHandler(rowsPerPage, currentPage - 1);
    },
  }));

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <p>
        Mostrando los registros del{" "}
        {rowsPerPage * currentPage - rowsPerPage + 1} al{" "}
        {rowsPerPage * currentPage < totalItems
          ? rowsPerPage * currentPage
          : totalItems}{" "}
        de un total de {totalItems} registros
      </p>
      <div className="flex justify-end items-center gap-2 text-sm">
        <button
          className="bg-primary rounded p-2 w-9 h-9 disabled:opacity-75 disabled:pointer-events-none"
          onClick={onPrevPage}
          disabled={!canGoBack}
        >
          <FontAwesomeIcon
            className="text-white"
            icon={faAngleLeft}
          ></FontAwesomeIcon>
        </button>
        <p>
          Página{" "}
          <span className="font-bold text-slate-700">
            {currentPage} de {noOfPages}
          </span>
        </p>
        <button
          className="bg-primary rounded p-2 w-9 h-9 disabled:opacity-75 disabled:pointer-events-none"
          onClick={onNextPage}
          disabled={!canGoNext}
        >
          <FontAwesomeIcon
            className="text-white"
            icon={faAngleRight}
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

export default TablePagination;
