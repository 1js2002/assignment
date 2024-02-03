"use client";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "@/components/seachBar";
import { useEffect, useState } from "react";
import Pagination from "@/components/pagination";
import ProductTable from "@/components/productTable";
import { Button, Modal } from "react-bootstrap";
import AddProductModal from "@/components/addProductModal";
export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerms, setSearchTerms] = useState({
    product: "",
    size: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postsPerPage = 3;

  const handleSearchChange = async (searchFormData) => {
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      product: searchFormData.product.toLowerCase(),
      size: searchFormData.size.toLowerCase(),
      phone: searchFormData.phoneNo,
    }));

    const { product, size, phoneNo } = searchFormData;

    try {
      const queryParams = new URLSearchParams();

      if (product) {
        queryParams.append("product", product.toLowerCase());
      }

      if (size) {
        queryParams.append("size", size.toLowerCase());
      }

      if (phoneNo) {
        queryParams.append("phone", phoneNo);
      }

      const queryString = queryParams.toString();
      console.log(queryString);

      const response = await fetch(`/api/product?${queryString}`);
      const data = await response.json();
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchAllProducts = async (page) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/product`);
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

 

  const paginate = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchAllProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!searchTerms.product) {
      fetchAllProducts(currentPage);
    }
  }, [searchTerms.product || searchTerms.size || searchTerms.phone]);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  return (
    <section className="flex flex-col m-4">
      <h1>Product List</h1>
      <div className="flex justify-between my-4">
        <SearchBar handleSearchChange={handleSearchChange} />
       
       
        <AddProductModal />
        
      </div>
      <div className="h-[470px]">
        <ProductTable
          data={
            searchTerms.product || searchTerms.size || searchTerms.phone
              ? filteredData
              : allPosts
          }
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          isLoading={isLoading}
        />
      </div>
      <div className=" ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
    </section>
  );
}
