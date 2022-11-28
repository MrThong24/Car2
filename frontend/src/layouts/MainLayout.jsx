/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Loading } from "../components";
import { OverLayContext } from "../context";

const MainLayout = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <OverLayContext.Provider value={{ loading, setLoading }}>
      {loading && <Loading loading={loading} />}
      {props.children}
    </OverLayContext.Provider>
  );
};

export default MainLayout;
