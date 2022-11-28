import React from "react";

const OverLayContext = React.createContext({
  loading: false,
  setLoading: () => {},
});
export default OverLayContext;
