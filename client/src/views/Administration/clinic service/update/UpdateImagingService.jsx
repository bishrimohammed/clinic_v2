import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useQueryClient } from "@tanstack/react-query";
import { Button, Container, Form, Spinner } from "react-bootstrap";

import { toast } from "react-toastify";
import { useUpdateImagingService } from "../hooks/useImagingService";

const schema = yup.object().shape({
  test_name: yup.string().required("lab test name is required"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .moreThan(0)
    .required("price is required"),
  imaging_category: yup.string(),
});
const UpdateImagingService = () => {
  const { state } = useLocation();

  const { mutateAsync, isPending } = useUpdateImagingService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test_name: state.test_name,
      price: state.price,
      imaging_category: state.imaging_category,
    },
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    mutateAsync(data).then((res) => {
      if (res.status === 201) {
        setValue("test_name", "");
        setValue("price", "");
        setValue("imaging_category", "");
      }
    });
  };
  return (
    <Container className="p-0">
      <h5 className="p-2 mt-1 mb-3 bluewhite-bg">
        Edit IMaging Studies Pricing Item{" "}
      </h5>
      <div className="p-3 boxshadow borderRadius7px">
        <Form onSubmit={handleSubmit(submitHandler)} noValidate className="">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="test_name">Name : </Form.Label>
            <Form.Control
              type="text"
              name="test_name"
              id="test_name"
              {...register("test_name")}
              placeholder="Enter Test Name"
              //isValid={touchedFields.test_name && !errors.test_name}
              isInvalid={errors.test_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.test_name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="price">Price : </Form.Label>
            <Form.Control
              type="number"
              name="price"
              id="price"
              {...register("price")}
              placeholder="enter price"
              isInvalid={errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Category">Category : </Form.Label>
            <Form.Control
              type="text"
              placeholder="Disabled readonly input"
              aria-label="Disabled input example"
              readOnly
              {...register("imaging_category")}
              id="Category"
              name="lab_category"
            />
          </Form.Group>
          <hr />
          <Button
            variant="danger"
            type="button"
            className="me-3"
            onClick={() => navigate(-1)}
          >
            Return
          </Button>
          <Button variant="primary" disabled={isPending} type="submit">
            {isPending && <Spinner animation="border" size="sm" />}
            Update
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateImagingService;
