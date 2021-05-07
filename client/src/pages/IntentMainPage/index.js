import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import cookie from "react-cookies";
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { List } from "antd";

const TopContainer = styled.div`
  display: flex;
  height: 80px;
  background-color: aliceblue;
  color: #0069c0;
  font-weight: bold;
  flex-direction: row;
  border-bottom: solid #0069c0;
`;
const PageNameWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const Blank = styled.div`
  width: 1%;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

function IntentMainPage() {
  let history = useHistory();
  const [intents, setIntents] = useState([]);

  const deleteIntentHandler = (intentID) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .delete(
          `${process.env.REACT_APP_API_HOST}/scenario/intents/${intentID}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.load("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.resultCode === 0) {
            alert("인텐트가 삭제되었습니다.");
            window.location.reload();
          }
        });
    }
  };

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
      <ContentWrapper>
        <Blank />
        <TableContainer>
          <List
            size="large"
            bordered
            header={
              <div
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Intent 목록
                <PlusOutlined
                  onClick={() => {
                    history.push("/registerintent");
                  }}
                />
              </div>
            }
            dataSource={intents}
            renderItem={(item) => (
              <List.Item
                extra={
                  <div>
                    <EyeOutlined
                      onClick={() => {
                        history.push(`/manageintent/${item.INTENT_ID}`);
                      }}
                    />
                    <DeleteOutlined
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        deleteIntentHandler(item.INTENT_ID);
                      }}
                    ></DeleteOutlined>
                  </div>
                }
              >
                {item.INTENT_TITLE}
              </List.Item>
            )}
            style={{ marginLeft: "-15px" }}
          ></List>
          <Blank />
        </TableContainer>
      </ContentWrapper>
    </>
  );
}

export default IntentMainPage;
