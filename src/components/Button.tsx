import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
  text: string;
  onClick: any;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

function Button({
  text,
  onClick,
  isLoading,
  disabled = false,
  className = "bg-primary",
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`text-white rounded w-100 px-4 py-3 leading-tight mx-auto lg:mx-0 inline-flex items-center disabled:opacity-75 ${className}`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading && (
        <FontAwesomeIcon
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          icon={faSpinner}
        ></FontAwesomeIcon>
      )}
      {text}
    </button>
  );
}

export default Button;
