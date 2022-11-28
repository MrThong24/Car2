import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { Overlay, Spinner } from "../styles";

const Loading = ({ loading }) => {
  return (
    <Overlay>
      <Spinner>
        <BounceLoader color="#fff" loading={loading} size={50} />
      </Spinner>
    </Overlay>
  );
};

export default Loading;
