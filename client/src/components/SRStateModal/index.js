import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/user";
import { authUser } from "../../actions/auth";
import axios from "axios";
import Logo from "../../assets/800px-Hyundai_Transys_logo.png";
import NoImage from "../../assets/noimage.png";
import { Button } from "react-bootstrap";
// import CloseButton from "./CloseButton";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import Datepicker from "../../components/Datepicker";
import { Radio } from "antd";
import "antd/dist/antd.css";

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;
const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 700px;
  max-width: 700px;
  top: 40%;
  transform: translateY(-40%);
  margin: 0 auto;
  padding: 20px 20px;
`;
const ContentWrapper = styled.div`
display: flex,
text-align: center,
width: 100%,
flex-direction: column,
`;
const LogoBox = styled.div`
  margin: 0px 0px 14px;
  display: flex;
  justify-content: center;
`;
const TypeText = styled.div`
  margin: 24px 0px 10px;
  font-size: 17px;
  letter-spacing: -0.5px;
  line-height: 22px;
  font-weight: 700;
`;
const HeadSpan = styled.span`
  display: flex;
  width: 100%;
  padding-bottom: 15px;
`;
const InfoText = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 700;
  color: red;
`;
const AgentInfoTableWrapper = styled.div`
  display: flex;
  border-top: solid #0069c0;
  width: 100%;
`;
const SecondRowWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

const LeftBox = styled.div`
  display: flex;
  width: 67%;
  margin-top: 20px;
  color: #0069c0;
`;
const RightBox = styled.div`
  display: flex;
  width: 33%;
  margin-top: 20px;
`;

const dateChanger = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;

  return String(year + month + day);
};

function SRStateModal({
  reqSEQ,
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) {
  //  const [agentInfos, setAgentInfos] = useState([]);
  let req_seq = reqSEQ;
  console.log(reqSEQ);
  const [csrStatus, setCSRStatus] = useState("");
  const [date, setDate] = useState();
  const csrStatusHandler = (e) => {
    console.log(e.target.value);
    setCSRStatus(e.target.value);
  };

  const dateHandler = (date) => {
    setDate(date);
  };
  const saveHandler = () => {
    console.log("Date" + date);
    let csrInfo = {
      CSR_STATUS: csrStatus,
      DATE: date,
    };
    if (date === undefined) {
      alert("날짜를 설정해주세요");
      return;
    }
    if (csrStatus === "요청처리중") {
      axios
        .put(`${process.env.REACT_APP_API_HOST}/agent/${reqSEQ}/0`, csrInfo, {
          headers: {
            Authorization: `Bearer ${cookie.load("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.resultCode === 0) {
            alert("상태가 변경되었습니다.");
            window.location.reload();
          }
        });
    } else if (csrStatus === "처리완료") {
      axios
        .put(`${process.env.REACT_APP_API_HOST}/agent/${reqSEQ}/1`, csrInfo, {
          headers: {
            Authorization: `Bearer ${cookie.load("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.resultCode === 0) {
            alert("상태가 변경되었습니다.");
            window.location.reload();
          }
        });
    } else {
      alert("상태를 설정해주세요!");
    }
  };

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };
  //    {closable && <div className="modal-close" onClick={close}></div>}
  //axios.defaults.withCredentials = true;
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner>
          <LogoBox>
            <img src={Logo} width="200px" height="50" />
          </LogoBox>

          <ContentWrapper>
            <TypeText>
              <HeadSpan>※ 서비스 처리 상태관리</HeadSpan>
              <InfoText>
                상태설정 시 예상완료일/처리완료일을 꼭 기입해주세요.
              </InfoText>
              <AgentInfoTableWrapper>
                <LeftBox>· 상태 지정</LeftBox>
                <RightBox>
                  <Radio.Group
                    value={csrStatus}
                    size="large"
                    onChange={csrStatusHandler}
                    style={{ marginLeft: "10px" }}
                  >
                    <Radio.Button value="요청처리중">요청처리중</Radio.Button>
                    <Radio.Button value="처리완료">처리완료</Radio.Button>
                  </Radio.Group>
                </RightBox>
              </AgentInfoTableWrapper>
              <SecondRowWrapper>
                {csrStatus === "처리완료" ? (
                  <LeftBox> · 처리 완료일 설정</LeftBox>
                ) : (
                  <LeftBox> · 예상 완료일 설정</LeftBox>
                )}

                <RightBox>
                  <Datepicker change={dateHandler} />
                </RightBox>
              </SecondRowWrapper>
            </TypeText>
            <ButtonWrapper>
              <Button
                variant="info"
                size="sm"
                onClick={() => {
                  saveHandler();
                }}
              >
                저장하기
              </Button>
            </ButtonWrapper>
            <form></form>

            {children}
          </ContentWrapper>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

SRStateModal.propTypes = {
  visible: PropTypes.bool,
};

export default SRStateModal;
