import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ operations }) {
  const [sortByParams, setSortByParams] = useSearchParams();
  const sortBy = sortByParams.get("sortBy") || "";

  function handleOnChange(e) {
    sortByParams.set("sortBy", e.target.value);
    setSortByParams(sortByParams);
  }
  
  return (
    <Select type="white" operations={operations} onChange={handleOnChange} value={sortBy} />
  );
}
