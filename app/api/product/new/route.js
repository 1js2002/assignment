import { connectToDB } from "@/utils/database";
import product from "@/models/productSchema";

export const POST = async (request) => {
  const data = await request.json();
  console.log("data:", data);
  try {
    await connectToDB();
    const newProduct = new product(data);

    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
