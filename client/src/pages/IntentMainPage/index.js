import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import styled, { css } from "styled-components";
import cookie from "react-cookies";

const TopContainer = styled.div`
  display: flex;
  height: 80px;
  background-color: aliceblue;
  color: #0069c0;
  font-weight: bold;
  flex-direction: column;
`;
const PageNameWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border-top: solid #0069c0;
`;

function IntentMainPage() {
  const [intents, setIntents] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/scenario/intents`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setIntents([...response.data]);
      });
  }, []);

  return (
    <>
      <TopContainer>
        <PageNameWrapper>
          <span style={{ marginLeft: "16px", fontSize: "18px" }}>
            ※ 챗봇 시나리오 관리
          </span>
        </PageNameWrapper>
      </TopContainer>
      <TableContainer>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th rowSpan="2" id="centerAlign">
                No
              </th>
              <th rowSpan="2" id="centerAlign">
                Intent Name
              </th>
            </tr>
          </thead>

          <tbody>
            {intents.map((intent, index) => (
              <tr key={index}>
                <td id="centerAlign">{intent.INTENT_ID}</td>
                <td id="centerAlign">{intent.INTENT_TITLE}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default IntentMainPage;
