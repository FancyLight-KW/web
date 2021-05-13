import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import styled from "styled-components";
import "./MySRPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import MySRModal from "../../components/MySRModal";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import dotenv from "dotenv";
dotenv.config();

const TopContainer = styled.div`
  display: flex;
  height: 60px;
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
const SearchBlock = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 15px;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border-top: solid #0069c0;
`;
const BetweenDate = styled.span`
  padding-left: 10px;
  padding-top: 3px;
  font-size: 14px;
`;
const Select = styled.select`
  margin-left: 10px;
  height: 27px;
`;
const Input = styled.input`
  margin-left: 8px;
  height: 28px;
`;

function MySRPage() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postPerPage, setPostPerPage] = useState(15);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const res = await axios.get(`${process.env.REACT_APP_API_HOST}/mypage`, {
  //       headers: {
  //         Authorization: `Bearer ${cookie.load("token")}`,
  //       },
  //     });
  //     setData(res.data);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  // ------------------

  const [Requests, setRequests] = useState([]);
  const [mySRModalVisible, setMySRModalVisible] = useState(false);
  const [myModalSRInfos, setMyModalSRInfos] = useState([]);

  useEffect(() => {
    const userID = JSON.stringify(
      jwt_decode(cookie.load("token")).User_id
    ).split('"')[1];
    //  console.log(JSON.stringify(jwt_decode(cookie.load("token"))));

    axios
      .get(`${process.env.REACT_APP_API_HOST}/mypage`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setRequests([...response.data]);
      });
  }, []);

  const mySROpenModal = (requestInfos) => {
    setMySRModalVisible(true);
    setMyModalSRInfos(requestInfos);
  };
  const mySRCloseModal = () => {
    setMySRModalVisible(false);
  };

  return (
    <>
      <TopContainer>
        <PageNameWrapper>
          <>
            <span style={{ marginLeft: "16px", fontSize: "18px" }}>
              ※ 나의 요청목록
            </span>
          </>
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
                서비스상태
              </th>
              <th rowSpan="2" id="centerAlign">
                문의대상
              </th>
              <th rowSpan="2" id="centerAlign">
                제목
              </th>
              <th colSpan="2" id="centerAlign">
                서비스 요청
              </th>
              <th colSpan="2" id="centerAlign">
                서비스 접수
              </th>
              <th colSpan="2" id="centerAlign">
                서비스 검토/처리
              </th>
            </tr>
            <tr>
              <th id="centerAlign">요청자</th>
              <th id="centerAlign">요청등록일</th>
              <th id="centerAlign">접수자</th>
              <th id="centerAlign">예상완료일</th>
              <th id="centerAlign">처리완료일</th>
            </tr>
          </thead>

          <tbody>
            {Requests.map((request, index) => (
              <tr
                key={index}
                onClick={() => {
                  mySROpenModal(request);
                }}
              >
                <td id="centerAlign">{request.REQ_SEQ}</td>
                <td id="centerAlign">{request.CSR_STATUS}</td>
                <td id="centerAlign">{request.TARGET_CODE}</td>
                <td id="centerAlign">{request.TITLE}</td>
                <td id="centerAlign">{request.REG_USER.User_name}</td>
                <td id="centerAlign">{request.createdAt.split(" ")[0]}</td>
                <td id="centerAlign">{request.MOD_USER_ID}</td>
                <td id="centerAlign">{request.EXPRECTED_FINISH_DATE}</td>
                <td id="centerAlign">{request.REAL_FINISH_DATE}</td>
              </tr>
            ))}
          </tbody>
          {mySRModalVisible && (
            <MySRModal
              requestInfos={myModalSRInfos}
              visible={mySRModalVisible}
              closable={true}
              maskClosable={true}
              onClose={mySRCloseModal}
            />
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default MySRPage;
