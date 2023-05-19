interface FileInputProps {
  label: string;
  inputProps: any;
  link?: React.ReactNode;
}

function FileInput(props: FileInputProps) {
  const handleOnChange = (e: any) => {
    props.inputProps.onChange({
      target: {
        value: e.target.files[0],
      },
    });
  };

  return (
    <label htmlFor="inputProps" className="block">
      {props.label} {props.link}
      <span className="sr-only">Seleccionar archivo</span>
      <input
        id={props.inputProps.id}
        name={props.inputProps.name}
        type="file"
        accept="video/*"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        onChange={handleOnChange}
      />
    </label>
  );
}

export default FileInput;
