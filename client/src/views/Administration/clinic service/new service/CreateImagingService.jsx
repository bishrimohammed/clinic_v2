//import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//import { useGetImagingStudiesTests } from "../../patient/hooks/useImagingStudies";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Spinner } from "react-bootstrap";
import instance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
//import { useLabCategory } from "../../patient/hooks/useLabCategory";
import { useImagingServiveType } from "../../../hooks/useImagingServiveType";
import { useAddImagingService } from "../hooks/useImagingService";
import { isPending } from "@reduxjs/toolkit";
import { useGetUnits } from "../hooks/useGetUnits";
import { useGetImagingCategory } from "../hooks/useGetImagingCategory";

const schema = yup.object().shape({
  test_name: yup.string().required("imaging test name is required"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .moreThan(0)
    .required("price is required"),

  imaging_category: yup.string().required("imaging category is required"),
  unit: yup.string(),
});
const CreateImagingService = () => {
  const { mutate, isPending } = useAddImagingService();
  const { data: units } = useGetUnits();
  const { data } = useGetImagingCategory();
  // const { data } = useImagingServiveType();
  // console.log(data);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test_name: "",
      price: null,
      imaging_category: "",
    },
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    // console.log(data);
    mutate(data);
  };
  return (
    <>
      <h5 className="p-2 mt-1 mb-3 bluewhite-bg">
        Add New Imaging Studies Service
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

          <Form.Group>
            <Form.Label htmlFor="imaging_category">
              imaging Category :{" "}
            </Form.Label>
            <Form.Select
              id="imaging_category"
              {...register("imaging_category")}
              aria-label="Default select example"
              isInvalid={errors.imaging_category}
            >
              <option value="">Open this select menu</option>
              {data?.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.imaging_category?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <>
            <Form.Group className="mb-3 ">
              <Form.Label htmlFor="lab_category"> unit </Form.Label>
              <Form.Select
                id="unit"
                {...register("unit")}
                aria-label="Default select example"
                isInvalid={errors.unit}
              >
                <option value={""}>Select unit</option>
                {units?.map((unit, index) => (
                  <option key={index} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.unit?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </>
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
            {isPending && <Spinner animation="border" size="sm" />}+ Add Service
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateImagingService;
