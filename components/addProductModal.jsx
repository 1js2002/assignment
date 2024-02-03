"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { validationSchema } from "@/models/validationSchema";
import SizeRadio from "@/components/sizeRadio";
import ColorRadio from "@/components/colorRadio";
import LocationForm from "@/components/Location";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import UploadImage from "./uploadImage";

const AddProductModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setSubmitting(false);
    setIsSubmitSuccessful(false);
    reset();
    setShow();
  };
  const handleShow = () => setShow(true);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleImageUpload = (imageUrl) => {
    register("image", { value: imageUrl });
  };
  const onSubmit = async (data) => {
    console.log(data);

    try {
      setSubmitting(true);

      const response = await axios.post("/api/product/new", data);

      if (response.status === 201) {
        console.log("Product added successfully");

        onHide();
      }
    } catch (error) {
      console.log("Error adding product");
      console.error(error);
      setIsSubmitSuccessful(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        add product
      </Button>
      <Modal centered size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3  space-x-3 items-center flex">
                <div className="flex w-1/2 space-x-2">
                  <div>
                    <Form.Label className="fw-bold">Product Name:</Form.Label>
                    <Form.Control
                      size="md"
                      type="text"
                      maxLength={20}
                      placeholder="product"
                      {...register("product")}
                      style={{ width: "200px" }} // Set the desired width here
                    />
                    <p className="text-xs text-red-400">
                      {errors?.product?.message}
                    </p>
                  </div>
                  <div>
                    <Form.Label className="fw-bold">Quantity:</Form.Label>
                    <Form.Control
                      size="md"
                      type="number"
                      max={100}
                      min={0}
                      placeholder="quanity"
                      {...register("quantity")}
                      style={{ width: "150px" }}
                    />
                    <p className="text-xs text-red-400">
                      {errors?.quantity?.message}
                    </p>
                  </div>
                  <div>
                    <Form.Label className="fw-bold">Price:</Form.Label>
                    <Form.Control
                      size="md"
                      min={0}
                      type="number"
                      placeholder="price"
                      {...register("price")}
                      style={{ width: "150px" }}
                    />
                    <p className="text-xs text-red-400">
                      {errors?.price?.message}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" w-1/2  mb-4 space-x-2">
                <Form.Label className="fw-bold">Product Image</Form.Label>
                <UploadImage onImageUpload={handleImageUpload} />
              </div>
              <div className="flex space-x-10 ">
                <div>
                  <Form.Label className="fw-bold">Color:</Form.Label>
                  <ColorRadio register={register} />
                  <p className="text-xs text-red-400">
                    {errors?.color?.message}
                  </p>
                </div>
                <div>
                  <Form.Label className="fw-bold">Size:</Form.Label>
                  <SizeRadio register={register} />
                  <p className="text-xs text-red-400">
                    {errors?.size?.message}
                  </p>
                </div>
                <div>
                  <Form.Label className="fw-bold">Brand:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    {...register("brand")}
                  >
                    <option value="Arrow">Arrow</option>
                    <option value="Reymond">Reymond</option>
                    <option value="ParkAvenue">Park Avenue</option>
                  </Form.Select>
                  <p className="text-xs text-red-400">
                    {errors?.brand?.message}
                  </p>
                </div>
              </div>
              <h1 className="fw-bold text-xl">Delivery Address</h1>{" "}
              <div className="mb-3 space-x-3 items-center flex">
                <div>
                  <Form.Label className="fw-bold"> Name:</Form.Label>
                  <Form.Control
                    size="md"
                    type="text"
                    placeholder="name"
                    {...register("name")}
                  />
                  <p className="text-xs text-red-400">
                    {errors?.name?.message}
                  </p>
                </div>
                <div>
                  <Form.Label className="fw-bold"> Phone Number:</Form.Label>
                  <Form.Control
                    size="md"
                    type="text"
                    placeholder="Number"
                    {...register("phone")}
                  />
                  <p className="text-xs text-red-400">
                    {errors?.phone?.message}
                  </p>
                </div>
                <div>
                  <LocationForm
                    register={register}
                    cityerrors={errors?.city?.message}
                    countryerrors={errors?.country?.message}
                    stateerrors={errors?.state?.message}
                  />
                </div>
              </div>
              <div className=" mb-3 space-x-3 items-start flex flex-col">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    {...register("address")}
                    as="textarea"
                    rows={3}
                    style={{ width: "400px", height: "100px" }}
                  />
                </Form.Group>
                <p className="text-xs text-red-400">
                  {errors?.address?.message}
                </p>
              </div>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProductModal;
