import React from "react";
import Form from "react-bootstrap/Form";
const ColorRadio = ({register}) => {
  return (
    <>
      <div>
        <Form.Check>
          <Form.Check.Input
            type="radio"
            name="red"
            value="red"
            {...register("color")}
          />
          <Form.Check.Label>Red</Form.Check.Label>
        </Form.Check>

        <Form.Check>
          <Form.Check.Input
            type="radio"
            name="blue"
            value="blue"
            {...register("color")}
          />
          <Form.Check.Label>Blue</Form.Check.Label>
        </Form.Check>

        <Form.Check>
          <Form.Check.Input
            type="radio"
            name="yellow"
            value="yellow"
            {...register("color")}
          />
          <Form.Check.Label>Yellow</Form.Check.Label>
        </Form.Check>
      </div>
    </>
  );
};

export default ColorRadio;
