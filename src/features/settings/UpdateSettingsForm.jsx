import Form from "../../ui/Form";
import RowForm from "../../ui/RowForm";
import Input from "../../ui/Input";
import { useSetting } from "./useSetting";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      breakFastPrice,
      MaxNumberOfGuestPerBooking,
    } = {},
  } = useSetting();

    if(isLoading) return <Spinner />
  return (
    <Form>
      <RowForm label="Minimum nights/booking">
        <Input type="number" id="min-nights" defaultValue={minBookingLength} />
      </RowForm>
      <RowForm label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength}/>
      </RowForm>
      <RowForm label="Maximum guests/booking">
        <Input type="number" id="max-guests" defaultValue={MaxNumberOfGuestPerBooking}/>
      </RowForm>
      <RowForm label="Breakfast price">
        <Input type="number" id="breakfast-price" defaultValue={breakFastPrice}/>
      </RowForm>
    </Form>
  );
}

export default UpdateSettingsForm;
