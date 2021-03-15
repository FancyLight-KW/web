import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import styled, { css } from "styled-components";
import "./ServiceRequest.css";
import Datepicker from "../Datepicker";
import axios from "axios";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border-top: solid #0069c0;
`;

const TopContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100px;
  background-color: aliceblue;
  justify-content: flex-start;
`;

const BetweenDate = styled.span`
  padding-left: 10px;
  padding-top: 3px;
  font-size: 14px;
`;
const Span = styled.span`
  margin-top: 3.3px;
  margin-left: 10px;
  height: 25px;
  color: #0069c0;
  font-weight: bold;
`;
const TopWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-flow: wrap;
`;
const DateSearchWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SearchButton = styled.button`
  margin-left: 10px;
  height: 25px;
`;

const MarginforButton = styled.div`
  margin-left: 1200px;
`;

function ServiceRequestPage() {
  const [Requests, setRequests] = useState([]);

  const dateChanger = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month > 9 ? month : "0" + month;
    day = day > 9 ? day : "0" + day;

    return String(year + month + day);
  };

  const [StartDate, setStartDate] = useState(dateChanger(new Date()));
  const [FinishDate, setFinishDate] = useState(dateChanger(new Date()));

  useEffect(() => {
    const endpoint = "http://localhost:5000/requests/getAllRequest";
    fetchRequests(endpoint);
  }, Requests);

  const fetchRequests = (endpoint) => {
    axios.get(endpoint).then((response) => {
      console.log(response);
      // setRequests(...response.data);
      setRequests([...Requests, ...response.data]);
    });
  };

  const StartdatedHandler = (date) => {
    setStartDate(date);
  };
  const FinishDateHandler = (date) => {
    setFinishDate(date);
  };
  // const SearchHandler = () => {

  // }

  return (
    <div>
      <TopContainer>
        <TopWrapper>
          <DateSearchWrapper>
            <Span>요청/접수 기간</Span>
            <Datepicker change={StartdatedHandler} />
            <BetweenDate>~</BetweenDate>
            <Datepicker change={FinishDateHandler} />

            <MarginforButton />

            <Button variant="primary" size="sm" onClick={console.log(Requests)}>
              IT 서비스 요청 콘솔확인
            </Button>
          </DateSearchWrapper>

          <Span />
          <Span>제목</Span>

          <SearchButton>검색</SearchButton>
        </TopWrapper>
      </TopContainer>
      <TableContainer>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th RowSpan="2" id="thCenterAlign">
                No
              </th>
              <th RowSpan="2" id="thCenterAlign">
                서비스상태
              </th>
              <th RowSpan="2" id="thCenterAlign">
                문의대상
              </th>
              <th RowSpan="2" id="thCenterAlign">
                시스템명1
              </th>
              <th RowSpan="2" id="thCenterAlign">
                시스템명2
              </th>
              <th RowSpan="2" id="thCenterAlign">
                문의유형
              </th>
              <th RowSpan="2" id="thCenterAlign">
                제목
              </th>

              <th colSpan="3">서비스 요청</th>
              <th colSpan="2">서비스 접수</th>
              <th colSpan="3">서비스 검토/처리</th>
            </tr>
            <tr>
              <th>부서</th>
              <th>성명</th>
              <th>요청등록일</th>
              <th>성명</th>
              <th>접수일</th>
              <th>설명</th>
              <th>예상완료일</th>
              <th>처리완료일</th>
            </tr>
          </thead>

          <tbody>
            {Requests.map((request) => (
              <tr>
                <td>{request.REQ_SEQ}</td>
                <td>{request.CSR_STATUS}</td>
                <td>{request.TARGET_CODE}</td>
                <td></td>
                <td></td>
                <td>{request.REQ_TYPE_CODE}</td>
                <td>{request.TITLE}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ServiceRequestPage;
