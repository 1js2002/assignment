import React from "react";
import Form from "react-bootstrap/Form";
const SizeRadio = ({register}) => {
  return (
    <>
      <div>
        <Form.Check >
          <Form.Check.Input
            type="radio"
            name="small"
            value="small"
            {...register("size")}
          />
          <Form.Check.Label>S</Form.Check.Label>
        </Form.Check>

        <Form.Check >
          <Form.Check.Input
            type="radio"
            name="medium"
            value="medium"
            {...register("size")}
          />
          <Form.Check.Label>M</Form.Check.Label>
        </Form.Check>

        <Form.Check>
          <Form.Check.Input
            type="radio"
            name="large"
            value="large"
            {...register("size")}
          />
          <Form.Check.Label>L</Form.Check.Label>
        </Form.Check>
      </div>
    </>
  );
};

export default SizeRadio;
