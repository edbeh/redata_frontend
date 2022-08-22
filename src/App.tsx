import { Button, FormInput } from "components";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
});

function App() {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  console.log("watch", watch());
  console.log("errors", errors);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col space-y-2 p-4">
        <FormInput
          register={register}
          name="firstName"
          id="firstName"
          label="First Name"
          error={errors?.firstName?.message as string}
        />

        <Button onClick={() => trigger()}>Learn react</Button>
        <Button variant="secondary">Register now</Button>
      </div>
    </form>
  );
}

export default App;
