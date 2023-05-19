interface InputProps {
  selectProps: any;
  children: JSX.Element[];
}

function Select({ selectProps, children }: InputProps) {
  return (
    <>
      <label htmlFor={selectProps.id}>{selectProps.label}</label>
      <select
        className="block w-full px-4 py-3 leading-tight text-black bg-white border border-gray-200 focus:border-cwz-secondary rounded focus:outline-none"
        {...selectProps}
      >
        {...children}
      </select>
    </>
  );
}

export default Select;
