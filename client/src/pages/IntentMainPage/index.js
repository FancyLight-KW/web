import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import cookie from "react-cookies";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { List } from "antd";
import arrow from "../../assets/arrow.png";

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
  width: 40%;
`;
const Arrow = styled.img`
  margin-top: -10px;
  margin-right: 3px;
  margin-left: ${(props) =>
    props.childDegree === 1
      ? "0px"
      : props.childDegree === 2
      ? "8px"
      : props.childDegree === 3
      ? "16px"
      : props.childDegree === 4
      ? "24px"
      : props.childDegree === 4
      ? "32px"
      : props.childDegree === 5
      ? "40px"
      : "48px"};
`;

function IntentMainPage() {
  let history = useHistory();
  const [intents, setIntents] = useState([]);

  const deleteIntentHandler = (intentName) => {
    const displayName = {
      intentName,
    };
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .post(
          `${process.env.REACT_APP_API_HOST}/dialogflow/deleteIntent`,
          displayName,
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
      .get(`${process.env.REACT_APP_API_HOST}/dialogflow/listIntent`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        //   console.log(response);
        console.log(response.data.result);
        setIntents([...response.data.result]);
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
                  title="새로운 intent 추가"
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
                  <>
                    <div>
                      {item.childDegree ? (
                        <Arrow
                          src={arrow}
                          width="10"
                          childDegree={item.childDegree}
                        />
                      ) : null}

                      {item.intentName}
                    </div>
                    <div>
                      {!item.childDegree ||
                      (item.childDegree < 6 && item.childDegree > 0) ? (
                        <PlusSquareOutlined
                          title="Followup intent 추가"
                          onClick={() => {
                            history.push(
                              `/addfollowupintent/${item.intentName}`
                            );
                          }}
                        />
                      ) : null}
                      <EyeOutlined
                        title="Intent 수정"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          history.push(`/manageintent/${item.intentName}`);
                        }}
                      />
                      <DeleteOutlined
                        title="Intent 삭제"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          deleteIntentHandler(item.intentName);
                        }}
                      ></DeleteOutlined>
                    </div>
                  </>
                }
              ></List.Item>
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
