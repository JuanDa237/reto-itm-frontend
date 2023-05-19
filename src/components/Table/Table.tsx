export interface Column {
  Header: string;
  accessor?: string;
  Cell: (cellProps: any) => JSX.Element;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

function Table({ columns, data }: TableProps) {
  const ResponsiveWrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ResponsiveWrapper>
      <table className="min-w-full text-sm">
        <thead className="bg-slate-200">
          <tr className="text-left text-slate-700">
            {columns.map((column, ind) => {
              return (
                <th key={ind} className="px-2 py-3">
                  {column.Header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, ind) => {
            return (
              <tr key={ind}>
                {columns.map((col) => {
                  const { Cell } = col;

                  return (
                    <td
                      key={col.Header}
                      className="px-2 py-3 border border-slate-200"
                    >
                      <Cell
                        value={col.accessor ? item[col.accessor] : null}
                        row={{ original: item }}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </ResponsiveWrapper>
  );
}

export default Table;
