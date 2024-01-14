import Button from "../../ui/Button";
import Form from "../../ui/Form";
import RowForm from "../../ui/RowForm";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const {errors} = formState;
  const { signup, isLoading } = useSignup();

  function onSubmit({email, password, fullName}){
    signup({email, password, fullName},{
      onSettled : ()=> reset()
    })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <RowForm label="Full name" error={errors?.fullName}>
        <Input type="text" id="fullName"
        {...register("fullName", {
          required: "this field is required",
        })
        } />
      </RowForm>

      <RowForm label="Email address" error={errors?.email}>
        <Input type="email" id="email" 
        disabled={isLoading}
        {...register("email", {
          required: "this field is required",
          pattern : {
            value : /\S+@\S+\.\S+/,
            message : "Please enter a valid email"
          }
        })
        }
        />
      </RowForm>

      <RowForm label="Password (min 8 characters)" error={errors?.password}>
        <Input type="password" id="password"
        disabled={isLoading}
        {...register("password", {
          required: "this field is required",
          minLength : {
            value : 8,
            message : 'the password should minimum 8 characters'
          }
        })
        }
         />
      </RowForm>

      <RowForm label="Repeat password" error={errors?.passwordConfirm}>
        <Input type="password" id="passwordConfirm"
        disabled={isLoading}
        {...register("passwordConfirm", {
          required: "this field is required",
          validate : (value) => getValues().password === value || "passwords need to match"
        })
        }
         />
      </RowForm>

      <RowForm>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading} >Create new user</Button>
      </RowForm>
    </Form>
  );
}

export default SignupForm;
