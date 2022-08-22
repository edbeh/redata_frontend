import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, FormInput, FormSelect } from "components";

const schema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
});

const lastNameOptions = [
  { value: "beh", label: "Beh" },
  { value: "wang", label: "Wang" },
];

function App() {
  const {
    register,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col space-y-4 p-4">
        <FormInput
          register={register}
          name="firstName"
          id="firstName"
          label="First Name"
          error={errors?.firstName?.message as string}
          disabled
        />

        <FormSelect
          control={control}
          name="lastName"
          id="lastName"
          label="Last name"
          options={lastNameOptions}
          error={errors?.lastName?.message as string}
          isClearable
        />

        <Button onClick={() => trigger()}>Learn react</Button>
        <Button variant="secondary">Register now</Button>
      </div>
    </form>
  );
}

export default App;
