interface CheckboxProps {
  label: string;
  inputProps: any;
}

function Checkbox(props: CheckboxProps) {
  const handleOnChange = (e: any) => {
    props.inputProps.onChange({
      target: {
        value: !props.inputProps.value,
      },
    });
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        id={props.inputProps.id}
        name={props.inputProps.name}
        value={props.label}
        checked={props.inputProps.value}
        onChange={handleOnChange}
      />
      <label htmlFor={props.inputProps.id} className="ml-2 text-black">
        {props.label}
      </label>
    </div>
  );
}

export default Checkbox;
