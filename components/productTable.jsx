import React from "react";
import Table from "react-bootstrap/Table";

const ProductTable = ({ data, isLoading, currentPage, postsPerPage }) => {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = data.slice(startIndex, endIndex);
  return (
    <div className="flex flex-col ">
      {isLoading ? (  
        <p className="flex items-center justify-center ">fetching data...</p>
      ) : (
        <Table className="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Size</th>
              <th scope="col"> Address</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.product}</td>
                <td>{post.quantity}</td>
                <td>{post.size}</td>
                <td>
                  {post.address}
                  {", "}
                  {post.city}
                  {", "}
                  {post.country}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductTable;
