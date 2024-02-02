import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { validationSchema } from "../schemas/productSchema";
import SizeRadio from "./sizeRadio";
import ColorRadio from "./colorRadio";
import LocationForm from "./Location";


function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    isSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          body
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      isSubmitting(false);
    }
  };

  return (
    <div className="w-full m-3">
      <h1 className="text-4xl text-center font-medium">Product Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-44 ">
          <Form.Label className="fw-bold">Product Name:</Form.Label>
          <Form.Control
            size="md"
            type="text"
            placeholder="product"
            {...register("product")}
          />
          <p className="text-xs text-red-400">{errors?.product?.message}</p>
          <Form.Label className="fw-bold">Quantity:</Form.Label>
          <Form.Control
            size="md"
            type="number"
            max={10}
            min={0}
            placeholder="quanity"
            {...register("quantity")}
          />
          <p className="text-xs text-red-400">{errors?.quantity?.message}</p>
          <Form.Label className="fw-bold">Price:</Form.Label>
          <Form.Control
            size="md"
            min={0}
            type="number"
            placeholder="price"
            {...register("price")}
          />
          <p className="text-xs text-red-400">{errors?.price?.message}</p>

          <Form.Label className="fw-bold">Brand:</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("brand")}
          >
            <option value="Arrow">Arrow</option>
            <option value="Reymond">Reymond</option>
            <option value="ParkAvenue">Park Avenue</option>
          </Form.Select>
          <p className="text-xs text-red-400">{errors?.brand?.message}</p>
          <SizeRadio register={register} />
          <p className="text-xs text-red-400">{errors?.size?.message}</p>
          <ColorRadio register={register} />
          <p className="text-xs text-red-400">{errors?.color?.message}</p>
          <Form.Label className="fw-bold">Product Image:</Form.Label>
          <Form.Control className="w-64" type="file" {...register("image")} />
          <p className="text-xs text-red-400">{errors?.image?.message}</p>
        </div>

        <div className="w-44">
          <Form.Label className="fw-bold"> Name:</Form.Label>
          <Form.Control
            size="md"
            type="text"
            placeholder="name"
            {...register("name")}
          />
          <p className="text-xs text-red-400">{errors?.name?.message}</p>
          <Form.Label className="fw-bold"> Address:</Form.Label>
          <Form.Control
            size="md"
            type="text"
            placeholder="Address"
            {...register("address")}
          />
          <p className="text-xs text-red-400">{errors?.address?.message}</p>
          <Form.Label className="fw-bold"> Phone Number:</Form.Label>
          <Form.Control
            size="md"
            type="text"
            placeholder="Number"
            {...register("phone")}
          />
          <p className="text-xs text-red-400">{errors?.phone?.message}</p>
          <LocationForm
            register={register}
            cityerrors={errors?.city?.message}
            countryerrors={errors?.country?.message}
            stateerrors={errors?.state?.message}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
