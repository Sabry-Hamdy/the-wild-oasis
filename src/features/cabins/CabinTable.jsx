import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // FILTER
  const filter = searchParams.get("discount") || "all";

  let filterdCabins;
  if (filter === "all") filterdCabins = cabins;
  if (filter === "with-discount")
    filterdCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (filter === "no-discount")
    filterdCabins = cabins.filter((cabin) => cabin.discount === 0);

  // SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortNames = (a, b) => {
    return modifier * a.toLowerCase().localeCompare(b.toLowerCase());
  };

  const sortDefault = (a, b) => {
    return modifier * (a - b);
  };

  const sortedCabins = filterdCabins.sort((a, b) => {
    return field === "name"
      ? sortNames(a[field], b[field])
      : sortDefault(a[field], b[field]);
  });

  return (
    <Menus>
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Name</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
