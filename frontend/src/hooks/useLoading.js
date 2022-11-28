/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { OverLayContext } from "../context";

// Use show loading when call api
export default function useLoading() {
  const { setLoading } = useContext(OverLayContext);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return [showLoading, hideLoading];
}
