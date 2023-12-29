import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import RowForm from "../../ui/RowForm";

function CreateCabinForm({cabinToEdit = {}}) {
  const {id : editId , ...editValues } = cabinToEdit;
  const editSession = Boolean(editId);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues : editSession ? editValues : '',
  });

  const { errors } = formState;
  const { isLoading: isCreating, mutate : CreateCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin has been created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
  });

  const { isLoading : isEditing, mutate : editCabin } = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if(editSession) editCabin({ newCabinData: { ...data, image }, id: editId }
    );
    else CreateCabin({...data, image : image})
  }

  const isWorking = isEditing || isCreating;
  function onError(error) {
    // console.log(error)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <RowForm label="Cabin name" error={errors?.name}>
        <Input
        disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
      </RowForm>
      <RowForm label="Maximum capacity" error={errors?.capacity}>
        <Input
        disabled={isWorking}
          type="number"
          id="capacity"
          {...register("capacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "the capacity must be grater than zero",
            },
          })}
        />
      </RowForm>
      <RowForm label="Regular price" error={errors?.regularPrice}>
        <Input
        disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "the price must be grater than zero",
            },
          })}
        />
      </RowForm>
      <RowForm label="Discount" error={errors?.discount}>
        <Input
        disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              value < getValues().regularPrice ||
              "the discount must be less than price",
          })}
        />
      </RowForm>
      <RowForm label="Description for website" error={errors?.description}>
        <Textarea
        disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </RowForm>
      <RowForm label="Cabin photo" error={errors?.image}>
        <FileInput id="image" accept="image/*"
        disabled={isWorking}
        {...register("image", {
          required: editSession ? false  : "this field is required",
        })}
        />
      </RowForm>
      <RowForm>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{editSession ?  'Edit cabin' : 'Create cabin'}</Button>
      </RowForm>
    </Form>
  );
}

export default CreateCabinForm;
