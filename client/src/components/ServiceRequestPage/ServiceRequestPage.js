import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import styled, { css } from "styled-components";
import "./ServiceRequest.css";
import Datepicker from "../Datepicker";
import { Link } from "react-router-dom";
import axios from "axios";
import searchImg from "../../assets/Search.png";

const TopContainer = styled.div`
  height: 100px;
  background-color: aliceblue;
`;
const TopFirstRowhWrapper = styled.div`
  height: 50%;
`;
const SecondRowWrapper = styled.div`
  height: 50%;
`;
const SearchBlock = styled.div`
  display: flex;
  margin-top: 12px;
  margin-left: 15px;
  color: #0069c0;
  font-weight: bold;
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
`;
const Input = styled.input`
  margin-left: 8px;
`;

function ServiceRequestPage() {
  // const [FilteredRequests, setFilterdRequests] = useState([]);
  const [Requests, setRequests] = useState([]);
  const [Query, setQuery] = useState(
    "http://localhost:5000/requests/getAllRequest?"
  );

  const [StartDate, setStartDate] = useState("");
  const [FinishDate, setFinishDate] = useState("");
  const [CSRStatus, setCSRStatus] = useState("");
  const [TargetCode, setTargetCode] = useState("");
  const [SearchType, setSearchType] = useState("title");
  const [Keyword, setKeyword] = useState("");

  const SearchHandler = () => {
    const queryKeyword =
      SearchType === "title"
        ? Keyword === ""
          ? ``
          : `&title=${Keyword}`
        : Keyword === ""
        ? ``
        : `&user=${Keyword}`;

    //  console.log(queryKeyword);
    const queryTargetCode = `&targetcode=${TargetCode}`;
    const queryCSRStatus = `&csrstatus=${CSRStatus}`;
    const queryDate =
      StartDate === ""
        ? FinishDate === ""
          ? ``
          : `&endDate=${FinishDate}`
        : FinishDate === ""
        ? `&startDate=${StartDate}`
        : `&startDate=${StartDate}&endDate=${FinishDate}`;
    //  console.log(queryDate);

    const searchAPI = `http://localhost:5000/requests/searchRequest/?${queryKeyword}${queryTargetCode}${queryCSRStatus}${queryDate}`;
    setQuery(searchAPI);
    console.log(searchAPI);
    // http://localhost:5000/requests/searchRequest/?user=sehwagod&title=제목&targetcode=QA장비&csrstatus=완료&startDate=20210311&endDate=20210317
  };

  useEffect(() => {
    // const endpoint = "http://localhost:5000/requests/getAllRequest?";
    fetchRequests(Query);
  }, [Query]);

  const fetchRequests = (Query) => {
    axios.get(Query).then((response) => {
      console.log(response);
      setRequests([...response.data]);
    });
  };

  const StartdatedHandler = (date) => {
    setStartDate(date);
    // console.log(StartDate);
  };
  const FinishDateHandler = (date) => {
    setFinishDate(date);
    //  console.log(FinishDate);
  };
  const keywordHandler = (e) => {
    setKeyword(e.target.value);
  };
  const searchTypeHandler = (e) => {
    setSearchType(e.target.value);
  };
  const csrStatusSearchHandler = (e) => {
    setCSRStatus(e.target.value);
    //  console.log(e.target.value);
  };

  const targetCodeSearchHandler = (e) => {
    setTargetCode(e.target.value);
    //  console.log(e.target.value);
  };

  return (
    <div>
      <TopContainer>
        <TopFirstRowhWrapper>
          <Row>
            <Col sm={2}>
              <SearchBlock>
                · 서비스 상태
                <Select onChange={csrStatusSearchHandler}>
                  <option value="" selected>
                    전체
                  </option>
                  <option value="접수대기">접수대기</option>
                  <option value="접수완료">접수완료</option>
                  <option value="변경관리 처리중">변경관리 처리중</option>
                  <option value="처리 지연중">처리 지연중</option>
                </Select>
              </SearchBlock>
            </Col>
            <Col sm={9}>
              <SearchBlock>
                · 요청/접수 기간
                <Datepicker change={StartdatedHandler} />
                <BetweenDate>~</BetweenDate>
                <Datepicker change={FinishDateHandler} />
              </SearchBlock>
            </Col>

            <Col sm={1}>
              <Link to="/itsr">
                <Button variant="primary" size="sm" id="margin_top_button">
                  IT 서비스 요청
                </Button>
              </Link>
            </Col>
          </Row>
        </TopFirstRowhWrapper>
        <SecondRowWrapper>
          <Row>
            <Col sm={2}>
              <SearchBlock>
                · 문의 대상
                <Select onChange={targetCodeSearchHandler}>
                  <option value="" selected>
                    전체
                  </option>
                  <option value="업무시스템">업무시스템</option>
                  <option value="IT인프라">IT인프라</option>
                  <option value="OA장비">OA장비</option>
                </Select>
              </SearchBlock>
            </Col>
            <Col sm={4}>
              <SearchBlock>
                ·
                <Select onChange={searchTypeHandler}>
                  <option value="title">제목</option>
                  <option value="user">작성자</option>
                </Select>
                <Input size="40" onChange={keywordHandler} />
                <Button
                  variant="secondary"
                  size="sm"
                  id="maring_left_button"
                  onClick={SearchHandler}
                >
                  <img src={searchImg} width="18" height="17" />
                  검색
                </Button>
              </SearchBlock>
            </Col>

            <Col sm={6} />
          </Row>
        </SecondRowWrapper>
      </TopContainer>
      <TableContainer>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th rowSpan="2" id="thCenterAlign">
                No
              </th>
              <th rowSpan="2" id="thCenterAlign">
                서비스상태
              </th>
              <th rowSpan="2" id="thCenterAlign">
                문의대상
              </th>
              <th rowSpan="2" id="thCenterAlign">
                시스템명1
              </th>
              <th rowSpan="2" id="thCenterAlign">
                시스템명2
              </th>
              <th rowSpan="2" id="thCenterAlign">
                문의유형
              </th>
              <th rowSpan="2" id="thCenterAlign">
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
            {Requests.map((request, index) => (
              <tr key={index}>
                <td>{request.REQ_SEQ}</td>
                <td>{request.CSR_STATUS}</td>
                <td>{request.TARGET_CODE}</td>
                <td></td>
                <td></td>
                <td>{request.REQ_TYPE_CODE}</td>
                <td>{request.TITLE}</td>
                <td></td>
                <td></td>
                <td>{request.REQ_FINISH_DATE}</td>
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
