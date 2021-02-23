import React, { useEffect } from "react";
import axios from "axios";

// test proxy
const Testpage = () => {
  useEffect(() => {
    axios.get("/users/1").then((response) => console.log(response));
  }, []);

  return (
    <div>
      <h2>테스트페이지</h2>
    </div>
  );
};

export default Testpage;
