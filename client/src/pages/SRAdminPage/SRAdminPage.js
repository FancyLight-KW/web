import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import styled, { css } from "styled-components";
import "./SRAdminPage.css";
import Datepicker from "../../components/Datepicker";
import { Link } from "react-router-dom";
import axios from "axios";
import SRModal from "../../components/SRModal";
import SearchAgentModal from "../../components/SearchAgentModal";
import searchImg from "../../assets/Search.png";
import cookie from "react-cookies";
import dotenv from "dotenv";
dotenv.config();

const TopContainer = styled.div`
  display: flex;
  height: 140px;
  background-color: aliceblue;
  color: #0069c0;
  font-weight: bold;
  flex-direction: column;
`;
const PageNameWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 33%;
  align-items: center;
`;
const TopFirstRowhWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 33%;
  color: black;
`;
const SecondRowWrapper = styled.div`
  display: flex;
  height: 33%;
  color: black;
`;
const SearchBlock = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 15px;
`;
const TableContainer = styled.div`
  display: flex;
  border-radius: 5px;
  border-top: solid #0069c0;
`;
// const InfoContainer = styled.div`
//   display: flex;
//   width: 85%;
// `;
// const MangageContainer = styled.div`
//   display: flex;
//   width: 15%;
// `;
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

function SRAdminPage() {
  // const [FilteredRequests, setFilterdRequests] = useState([]);
  const [Requests, setRequests] = useState([]);
  const [Query, setQuery] = useState(
    `${process.env.REACT_APP_API_HOST}/admin` //get All request
  );

  const [sRModalVisible, setSRModalVisible] = useState(false);
  const [modalSRInfos, setModalSRInfos] = useState([]);
  const [searchAgentModalVisible, setSearchAgentModalVisible] = useState(false);
  const [reqSEQ, setREQSEQ] = useState("");

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

    const searchAPI = `http://localhost:5000/requests/search?${queryKeyword}${queryTargetCode}${queryCSRStatus}${queryDate}`;
    setQuery(searchAPI);
    //   console.log(searchAPI);
    // http://localhost:5000/requests/searchRequest/?user=sehwagod&title=제목&targetcode=QA장비&csrstatus=완료&startDate=20210311&endDate=20210317
  };

  useEffect(() => {
    fetchRequests(Query);
  }, [Query]);

  const fetchRequests = (Query) => {
    axios
      .get(Query, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setRequests([...response.data]);
      });
  };

  const StartdatedHandler = (date) => {
    setStartDate(date);
  };
  const FinishDateHandler = (date) => {
    setFinishDate(date);
  };
  const keywordHandler = (e) => {
    setKeyword(e.target.value);
  };
  const searchTypeHandler = (e) => {
    setSearchType(e.target.value);
  };
  const csrStatusSearchHandler = (e) => {
    setCSRStatus(e.target.value);
  };

  const targetCodeSearchHandler = (e) => {
    setTargetCode(e.target.value);
  };
  const searchAgentOpenModal = (reqseq) => {
    setSearchAgentModalVisible(true);
    setREQSEQ(reqseq);
    //   setMyModalSRInfos(requestInfos);
  };
  const searchAgentCloseModal = () => {
    setSearchAgentModalVisible(false);
  };
  const sROpenModal = (requestInfos) => {
    setSRModalVisible(true);
    setModalSRInfos(requestInfos);
    //  console.log(index);
    //  console.log(Requests[0]["TITLE"]);
  };
  const sRCloseModal = () => {
    setSRModalVisible(false);
  };
  const denySRHandler = (reqSEQ) => {
    let reqseq = {
      REQ_SEQ: reqSEQ,
    };

    axios
      .put(`${process.env.REACT_APP_API_HOST}/admin/deny`, reqseq, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.resultCode === 0) {
          alert("요청이 반려되었습니다.");
          window.location.reload();
        }
      });
  };

  return (
    <>
      <TopContainer>
        <PageNameWrapper>
          <div
            style={{
              display: "flex",
              width: "90%",
            }}
          >
            <span style={{ marginLeft: "16px", fontSize: "18px" }}>
              ※ 나의 결재목록
            </span>
          </div>
        </PageNameWrapper>
        <TopFirstRowhWrapper>
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

          <SearchBlock>
            · 요청/접수 기간
            <Datepicker change={StartdatedHandler} />
            <BetweenDate>~</BetweenDate>
            <Datepicker change={FinishDateHandler} />
          </SearchBlock>
        </TopFirstRowhWrapper>
        <SecondRowWrapper>
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
              id="searchButton"
              onClick={SearchHandler}
            >
              <img src={searchImg} width="18" height="17" />
              검색
            </Button>
          </SearchBlock>
        </SecondRowWrapper>
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
              <th colSpan="1" id="centerAlign">
                서비스 접수
              </th>
              <th colSpan="2" id="centerAlign">
                요청 처리
              </th>
            </tr>
            <tr>
              <th id="centerAlign">요청자</th>
              <th id="centerAlign">요청등록일</th>
              <th id="centerAlign">세부정보</th>
              <th id="centerAlign">승인</th>
              <th id="centerAlign">반려</th>
            </tr>
          </thead>

          <tbody>
            {Requests.map((request, index) => (
              <tr key={index}>
                <td id="centerAlign">{request.REQ_SEQ}</td>
                <td id="centerAlign">{request.CSR_STATUS}</td>
                <td id="centerAlign">{request.TARGET_CODE}</td>
                <td id="centerAlign">{request.TITLE}</td>
                <td id="centerAlign">{request.REG_USER.User_name}</td>
                <td id="centerAlign">{request.createdAt.split(" ")[0]}</td>

                <td id="centerAlign">
                  {" "}
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => {
                      sROpenModal(request);
                    }}
                  >
                    세부정보 보기
                  </Button>
                </td>

                <td id="centerAlign">
                  {" "}
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      searchAgentOpenModal(request.REQ_SEQ);
                    }}
                  >
                    승인하기
                  </Button>
                </td>
                <td id="centerAlign">
                  {" "}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      denySRHandler(request.REQ_SEQ);
                    }}
                  >
                    반려하기
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          {sRModalVisible && (
            <SRModal
              requestInfos={modalSRInfos}
              visible={sRModalVisible}
              closable={true}
              maskClosable={true}
              onClose={sRCloseModal}
            />
          )}
          {searchAgentModalVisible && (
            <SearchAgentModal
              reqSEQ={reqSEQ}
              visible={searchAgentModalVisible}
              closable={true}
              maskClosable={true}
              onClose={searchAgentCloseModal}
            />
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default SRAdminPage;
