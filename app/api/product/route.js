// Your API route

import { connectToDB } from "@/utils/database";
import product from "@/models/productSchema";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1; // Parse the page parameter
  const productQuery = searchParams.get("product");
  const sizeQuery = searchParams.get("size");
  const phoneQuery = searchParams.get("phone");
  const POST_PER_PAGE = 5;

  const query = {
    take: POST_PER_PAGE,
    skip: (page - 1) * POST_PER_PAGE,
  };

  try {
    await connectToDB();

    let productDetails;

    if (productQuery || sizeQuery || phoneQuery) {
      const searchConditions = [];

      if (productQuery) {
        searchConditions.push({
          product: { $regex: new RegExp(productQuery, "i") },
        });
      }
      console.log("productQuery:", productQuery);

      if (sizeQuery) {
        searchConditions.push({ size: { $regex: new RegExp(sizeQuery, "i") } });
      }
      console.log("sizeQuery:", sizeQuery);

      if (phoneQuery) {
        searchConditions.push({
          phone: { $regex: new RegExp(phoneQuery, "i") },
        });
      }
      console.log("phoneQuery:", phoneQuery);
      console.log("searchConditions:", searchConditions);
      productDetails = await product.find({
        $and: searchConditions,
      });
      console.log("productDetails:", productDetails);
    } else {
      productDetails = await product
        .find({})
    }

    return new Response(JSON.stringify(productDetails), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch products", { status: 500 });
  }
};
