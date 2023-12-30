import Form from "../../ui/Form";
import RowForm from "../../ui/RowForm";
import Input from "../../ui/Input";
import { useSetting } from "./useSetting";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

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
  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, filed) {
    const {value} = e.target;
    if(!value) return ;
    updateSetting({[filed]: value})
  }
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <RowForm label="Minimum nights/booking">
        <Input type="number" id="min-nights" defaultValue={minBookingLength} onBlur={(e)=>handleUpdate(e,'minBookingLength')}/>
      </RowForm>
      <RowForm label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength} onBlur={(e)=>handleUpdate(e,'maxBookingLength')} />
      </RowForm>
      <RowForm label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={MaxNumberOfGuestPerBooking} onBlur={(e)=>handleUpdate(e,'MaxNumberOfGuestPerBooking')}
        />
      </RowForm>
      <RowForm label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice} onBlur={(e)=>handleUpdate(e,'breakFastPrice')}
        />
      </RowForm>
    </Form>
  );
}

export default UpdateSettingsForm;
