import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import RowForm from "../../ui/RowForm";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin has been created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
  });
  function onSubmit(data) {
    mutate({...data, image : data.image[0]});
  }
  function onError(error) {
    // console.log(error)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <RowForm label="Cabin name" error={errors?.name}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
      </RowForm>
      <RowForm label="Maximum capacity" error={errors?.capacity}>
        <Input
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
        {...register("image", {
          required: "this field is required",
        })}
        />
      </RowForm>
      <RowForm>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Create cabin</Button>
      </RowForm>
    </Form>
  );
}

export default CreateCabinForm;
