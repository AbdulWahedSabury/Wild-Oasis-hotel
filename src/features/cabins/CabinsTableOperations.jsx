import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";

export default function CabinsTableOperations() {
  return (
    <Filter
      filterValue="discount"
      operations={[
    { value: "all", label: "All" },
    { value: "no-discount", label: "No Discount" },
    { value: "with-discount", label: "With Discount" }]}
    />
  );
}
