import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status')
  const filter = (!filterValue || filterValue === 'all') ? null : {filed : 'status', value : filterValue}

  const sortByRow = searchParams.get('sortBy') || 'startDate-desc';
  const [filed, direction] = sortByRow.split("-")
  const sortBy = {filed, direction}

  const {bookings, isLoading, error, count} = useBookings({filter, sortBy});

  if(isLoading) return <Spinner />
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
