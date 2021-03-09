import React from "react";
import { Table } from "react-bootstrap";
import styled, { css } from "styled-components";
import "./ServiceRequest.css";
import Datepicker from "../Datepicker";

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

function ServiceRequestPage() {
  return (
    <div>
      <TopContainer>
        요청/접수
        <Datepicker />
        ~
        <Datepicker />
        요청/접수
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
              <th colSpan="2">서비스 등록</th>
              <th colSpan="3">서비스 요청</th>
              <th colSpan="2">서비스 접수</th>
              <th colSpan="3">서비스 검토/처리</th>
            </tr>
            <tr>
              <th>부서</th>
              <th>성명</th>
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
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ServiceRequestPage;
