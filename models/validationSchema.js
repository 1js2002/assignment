import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
    product: Yup.string().required("Product name is required"),
    quantity: Yup.number()
      .required("Please provide the price.")
      .typeError("quantity must be a number")
      .min(0, "Too little")
      .max(5000, "Very costly!"),
    price: Yup.number()
      .typeError("price must be a number")
      .min(2)
      .max(20)
      .required("Price is required"),
    brand: Yup.string()
      .oneOf(["ParkAvenue", "Arrow", "Reymond"], "Please select a brand")
      .required("Brand is required"),
    color: Yup.string()
        .oneOf(["red", "yellow", "blue"], "Please select a color")
        .required("Color is required"),
    size: Yup.string()
      .oneOf(["small", "medium", "large"], "Please select a size")
      .required("Size is required"),
    image: Yup.string().required("Image is a required field"),
    name: Yup.string().required("Name is a required field"),
    address: Yup.string().required("Address is a required field"),
    city: Yup.string("Please select your city"),
    country: Yup.string().required("Please select your country"),
    state: Yup.string(),
    phone: Yup.string()
      .required("Phone is a required field")
      .matches(
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number format"
      ),
  });