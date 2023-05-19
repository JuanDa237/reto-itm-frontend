interface AlertProps {
  type: "success" | "error";
  message: string;
}

function Alert(props: AlertProps) {
  const classes = {
    success: (
      <div className="w-100 border rounded p-3 bg-green-200 border-green-300 text-green-900">
        {props.message}
      </div>
    ),
    error: (
      <div className="w-100 border rounded p-3 bg-red-200 border-red-300 text-red-900">
        {props.message}
      </div>
    ),
  };

  return classes[props.type];
}

export default Alert;
