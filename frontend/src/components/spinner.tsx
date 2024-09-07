import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

type SpinnerProps = {
  color?: string,
  loading: boolean
  cssOverride?: CSSProperties,
  size?: number
}

const Spinner = (props: SpinnerProps) => {
  return (  
    <ClipLoader {...props} />
  );
}
 
export default Spinner;