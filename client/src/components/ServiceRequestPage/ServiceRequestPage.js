import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import styled, { css } from "styled-components";
import "./ServiceRequest.css";
import Datepicker from "../Datepicker";
import axios from "axios";

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

const TopWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-flow: wrap;
`;

const SRButton = styled(Button)`
  margin-left: 500px;
`;

const Select = styled.select`
  margin-left: 10px;
`;
const Input = styled.input`
  margin-left: 8px;
`;

function ServiceRequestPage() {
  const [Requests, setRequests] = useState([]);

  const [StartDate, setStartDate] = useState("");
  const [FinishDate, setFinishDate] = useState("");
  const [Keyword, setKeyword] = useState("");

  const SearchHandler = () => {
    const queryDate =
      StartDate === ""
        ? FinishDate === ""
          ? ``
          : `&finishDate=${FinishDate}`
        : FinishDate === ""
        ? `&startDate=${StartDate}`
        : `&startDate=${StartDate}&finishDate=${FinishDate}`;
    console.log(queryDate);

    const queryKeyword = Keyword ? `keyword=${Keyword}` : ``;
    console.log(queryKeyword);

    const searchAPI = `http://localhost:5000/requests/searchRequest/?${queryDate}`;
    console.log(searchAPI);
    // http://localhost:5000/requests/searchRequest/?keyword=제목&searchparam=title&startDate=20210310
  };

  useEffect(() => {
    const endpoint = "http://localhost:5000/requests/getAllRequest";
    fetchRequests(endpoint);
  }, []);

  const fetchRequests = (endpoint) => {
    axios.get(endpoint).then((response) => {
      console.log(response);
      // setRequests(...response.data);
      setRequests([...Requests, ...response.data]);
    });
  };

  const StartdatedHandler = (date) => {
    setStartDate(date);
    console.log(StartDate);
  };
  const FinishDateHandler = (date) => {
    setFinishDate(date);
    console.log(FinishDate);
  };
  const keywordHandler = (e) => {
    setKeyword(e.target.value);
  };

  // <TopWrapper>
  //         <FirstRowhWrapper>
  //           <Row>
  //             <Col xs={16} md={11}>
  //               <Span>· 요청/접수 기간</Span>
  //               <Datepicker change={StartdatedHandler} />
  //               <BetweenDate>~</BetweenDate>
  //               <Datepicker change={FinishDateHandler} />
  //               <Span>
  //                 {" "}
  //                 · 문의 대상
  //                 <Select>
  //                   <option>업무시스템</option>
  //                   <option>IT인프라</option>
  //                   <option>QA장비</option>
  //                 </Select>
  //               </Span>
  //             </Col>
  //             <Col xs={2} md={1}>
  //               <SRButton>IT서비스 요청</SRButton>
  //             </Col>
  //           </Row>
  //         </FirstRowhWrapper>
  //         <Span>
  //           ·
  //           <Select>
  //             <option>제목</option>
  //             <option>작성자</option>
  //           </Select>
  //           <Input size="40" onChange={keywordHandler} />
  //         </Span>
  //         <Span>· 문의 유형</Span>
  //         <Span>
  //           <button onClick={SearchHandler}>검색</button>
  //         </Span>
  //       </TopWrapper>

  return (
    <div>
      <TopContainer>
        <TopFirstRowhWrapper>
          <Row>
            <Col sm={2}>
              <SearchBlock>
                · 서비스 상태
                <Select>
                  <option>접수대기</option>
                  <option>접수완료</option>
                  <option>변경관리 처리중</option>
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
              <Button variant="primary" size="sm" id="margin_top_button">
                IT 서비스 요청
              </Button>
            </Col>
          </Row>
        </TopFirstRowhWrapper>
        <SecondRowWrapper>
          <Row>
            <Col sm={2}>
              <SearchBlock>
                · 문의 대상
                <Select>
                  <option>업무시스템</option>
                  <option>IT인프라</option>
                  <option>QA장비</option>
                </Select>
              </SearchBlock>
            </Col>
            <Col sm={4}>
              <SearchBlock>
                ·
                <Select>
                  <option>제목</option>
                  <option>작성자</option>
                </Select>
                <Input size="40" onChange={keywordHandler} />
                <Button variant="secondary" size="sm" id="maring_left_button">
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
