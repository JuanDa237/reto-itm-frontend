import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

interface CheckOrXProps {
  check: boolean;
}

export const CheckOrX = (props: CheckOrXProps) => {
  return props.check ? (
    <FontAwesomeIcon icon={faCheck} />
  ) : (
    <FontAwesomeIcon icon={faX} />
  );
};
