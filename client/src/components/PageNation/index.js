import React from "react";
import Pagination from "react-bootstrap/Pagination";

function PageNation() {
  // <Pagination.Ellipsis />     <Pagination.Ellipsis />
  //   <Pagination.Item disabled>{14}</Pagination.Item>
  // <Pagination.First />
  //  <Pagination.Last />
  //  <Pagination.Item active>{12}</Pagination.Item>

  return (
    <div>
      <Pagination>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>

        <Pagination.Next />
      </Pagination>
    </div>
  );
}

export default PageNation;
