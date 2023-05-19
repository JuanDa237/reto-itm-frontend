interface TextAreaProps {
  label: string;
  labelClass?: string;
  placeholder: string;
  id: string;
  inputProps: any;
}

function TextArea(props: TextAreaProps) {
  return (
    <>
      <label
        className={props.labelClass ? props.labelClass : "text-black"}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <textarea
        placeholder={props.placeholder}
        {...props.inputProps}
        className="appearance-none block w-full px-4 py-3 leading-tight text-black bg-white border border-gray-200 focus:border-cwz-secondary rounded focus:outline-none"
      ></textarea>
    </>
  );
}

export default TextArea;
