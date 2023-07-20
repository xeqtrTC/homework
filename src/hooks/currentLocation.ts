import { useLocation } from "react-router-dom";

const useCurrentLocation = () => {
  const location = useLocation();
  return location.pathname;
};

export default useCurrentLocation;