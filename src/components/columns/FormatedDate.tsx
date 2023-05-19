import { formatDate } from "../../common/functions/formatDate";

export const FormatedDate = (cell: any) => {
  return <>{cell.value ? formatDate(cell.value) : ""}</>;
};
