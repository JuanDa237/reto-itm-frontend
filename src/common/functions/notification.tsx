import toastr from "toastr";

type ToastType = "info" | "warning" | "error" | "success";

export const notification = (
  toastType: ToastType = "success",
  message: string,
  positionClass = "toast-bottom-right"
) => {
  toastr.options = {
    positionClass,
  };

  switch (toastType) {
    case "info":
      toastr.info(message);
      break;
    case "warning":
      toastr.warning(message);
      break;
    case "error":
      toastr.error(message);
      break;
    default:
      toastr.success(message);
      break;
  }
};
