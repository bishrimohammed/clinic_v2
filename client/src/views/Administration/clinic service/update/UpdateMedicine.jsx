import { Col, Container, Row, Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../../../../components/inputs/TextInput";
import NumberInput from "../../../../components/inputs/NumberInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddMedicine, useUpdateMedicine } from "../hooks/useMedicine";
const schema = yup.object().shape({
  drugname: yup.string().required("Drug name is required"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .moreThan(0)
    .required("price is required"),

  description: yup.string(),
});
const UpdateMedicine = () => {
  const { state } = useLocation();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      description: state.description,
      price: state.price,
      drugname: state.drugname,
    },
    resolver: yupResolver(schema),
  });
  const { mutateAsync, isPending } = useUpdateMedicine();
  const navigate = useNavigate();
  const submitHandler = (data) => {
    mutateAsync(data).then((res) => {
      if (res.status === 200) {
        setValue("description", "");
        setValue("price", "");
        setValue("drugname", "");
      }
    });
  };
  return (
    <Container className="p-0">
      <h5 className="p-2 mt-1 mb-3 bluewhite-bg">Update Medicine</h5>

      <div className="p-3 boxshadow borderRadius7px">
        {" "}
        <Form onSubmit={handleSubmit(submitHandler)} noValidate className="">
          <TextInput
            register={register}
            label="Drug name"
            name="drugname"
            errors={errors.drugname}
          />
          <TextInput
            register={register}
            label="description"
            name="description"
            errors={errors.description}
          />
          <NumberInput
            register={register}
            label="price"
            name="price"
            errors={errors.price}
          />

          <Button
            variant="danger"
            type="button"
            className="me-3"
            onClick={() => navigate(-1)}
          >
            Return
          </Button>
          <Button variant="primary" disabled={isPending} type="submit">
            {isPending && <Spinner animation="border" size="sm" />}+ Update
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateMedicine;
