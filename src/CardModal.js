import React from "react";
import styled from "styled-components";
import axios from "axios";
import CommentList from'./CommentList';

const CardModal = (props) => {
  const [answerInfo, setAnswerInfo] = React.useState([]);
  const [comment_list, setComment] = React.useState([]);
  console.log(answerInfo)
  let topic = "";
  if (answerInfo?.questionTopic?.length > 0) {
    topic = answerInfo?.questionTopic[0];
  }


  let color = "";

    if (topic === "가치") {
      color = "#7249B4";
    } else if (topic === "관계") {
      color = "#2761CC";
    } else if (topic === "우정") {
      color = "#E0692D";
    } else if (topic === "나") {
      color = "#458857";
    } else if (topic === "사랑") {
      color = "#D34242";
    } else {
      color = "#E6BA28";
    }

React.useEffect(() => {
        const optioncomment = {
        url: `/comment/${props.answerId}`,
        method: "GET",
        };
        axios(optioncomment)
        .then((response) => {
            setComment(response.data.comments);
        })
        .catch((err) => {
            console.log(err);
            if (err.response) {
            console.log(err.response.data);
            }
        });

    const options = {
        url: `/bookshelf/bookCardDetail/${props.answerId}`,
        method: "GET",
      };
      axios(options)
        .then((response) => {
            setAnswerInfo(response.data.bookCardDetail[0])
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(err.response);
          }
        });
},[])

  return (
    <React.Fragment>
      <Component
        onClick={() => {
          props.close();
        }}
        />
        <ModalComponent book={props.book}>
          <ModalContent type={answerInfo?.type}>
            <CardWriterBox>
              <CardWriterInfoLeft>
                <CardWriterLeft type={answerInfo?.type}>
                  <CardWriterProfileLeft
                    onClick={()=>{window.open(`https://thinknote.us/others/${answerInfo?.answerUserId}`)}}
                    src={answerInfo?.answerUserProfileImg}
                  />
                  <CardWriterNickNameLeft>
                    <span onClick={()=>{window.open(`https://thinknote.us/others/${answerInfo?.answerUserId}`)}} style={{ font: 'normal normal bold 13px/19px Noto Sans CJK KR',letterSpacing: '0px',color: '#121212',cursor: "pointer"}}>
                      {answerInfo?.nickname}님
                    </span>
                    <img alt='그냥 점'src='https://user-images.githubusercontent.com/77574867/119256677-d6831680-bbfc-11eb-8be2-11f15c7caa2b.png' style={{width:'4px',height:'4px',margin:'0px 7px 3px 7px'}}/>
                    <span
                      style={{
                        letterSpacing: "0px",
                        font: 'normal normal normal 13px/19px Noto Sans CJK KR',color: '#474747',
                      }}
                    >
                      {answerInfo?.questionCreatedUserNickname}님의 질문
                    </span>
                  </CardWriterNickNameLeft>
                </CardWriterLeft>
                <div style={{marginTop:'5px',display:'flex', alignItems: "center"}}>
                </div>
              </CardWriterInfoLeft>
              <CardQuestionContent>
              <HashTag 
                onClick={()=>{window.open(`https://thinknote.us/topic/${topic}`)}}
                style={{color: color, border: `1px solid ${color}`}}
              >
                <span>#{topic}</span>
              </HashTag>
              <span style={{display: "flex", alignItems: "center"}}>
                {answerInfo?.questionContents}
              </span>
              </CardQuestionContent>
            </CardWriterBox>
            <CardWriteLeftBody type={answerInfo?.type}>
                <CardAnswerContent type={answerInfo?.type} style={{ whiteSpace: "pre-wrap" }}>
                  {answerInfo?.answerContents}
                </CardAnswerContent>
            </CardWriteLeftBody>
            <IconContainer type={answerInfo?.type}>
              <IconBox>
                <LikeContainer>
                    <LikeIcon src='https://user-images.githubusercontent.com/77369674/118684661-5eec6a80-b83d-11eb-8eba-7ad33f5a05e2.png'/>
                  <LikeCount>{answerInfo?.likeCount}</LikeCount>
                </LikeContainer>
                <CommentContainer>
                  <CommentBtn>
                  <CommentIcon src="https://user-images.githubusercontent.com/77369674/118684657-5e53d400-b83d-11eb-861f-41aa269aa89e.png" />
                    <CommentCount>{comment_list?.length}</CommentCount>
                  </CommentBtn>
                </CommentContainer>
              </IconBox>
            </IconContainer>
          </ModalContent>
          <ModalRightContainer>
            <CommentList comment_list={comment_list}/>
          </ModalRightContainer>
        </ModalComponent>
    </React.Fragment>
  );
};



const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.5;
  height: 100vh;
  width: 100vw;
  background: black;
  z-index: 120;
`;


const ModalComponent = styled.div`
  position: fixed;
  width: 640px;
  max-width:640px;
  height: 500px;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 130;
  display: flex;

`;

const ModalContent = styled.div`
  box-sizing: border-box;
  padding-top:20px;
  min-width: 360px;
  max-width: 360px;
  height: 500px;
  border-right: 1px solid #efefef;
`;

const HashTag = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  min-width: 58px;
  max-width: 58px;
  min-height:25px;
  max-height:25px;
  border-radius: 25px;
  text-align: center;
  font: normal normal bold 11px/16px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #7249B4;
  margin-right: 10px;
  cursor: pointer;
`;

const CardWriteLeftBody = styled.div`
padding:0px 25px;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;

`;

const CardWriterBox = styled.div`
  padding:0px 25px;
  border-bottom: 1px solid #efefef;
  min-height: 52px;
  max-height: 52px;
  margin-bottom:100px;

`;

const CardWriterInfoLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const CardWriterLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 100%;
  margin-right:20px;
  margin-bottom: 30px;
`;

const CardWriterProfileLeft = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: pointer;
`;

const CardWriterNickNameLeft = styled.span`
  margin-left: 8px;
`;

const CardQuestionContent = styled.div`
  display:flex;
  flex-direction:row;
  margin-right:20px;
  margin-bottom: 25px;
  padding: 15px 0;
  font: normal normal 800 16px/19px NanumMyeongjo;
  letter-spacing: 0px;
  color: #121212;
  opacity: 1;
`;


const CardAnswerContent = styled.div`
  margin: 20px 40px 17px 0px;
  padding: 10px 0 10px 0;
  font: normal normal normal 14px/20px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #363636;
  min-height:240px;
  max-height: 240px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  };
`;


const ModalRightContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 10px 0px;
  // border-radius: 0px 50px 50px 0px;
`;

const IconContainer = styled.div`
  z-index:1;
  display: flex;
  min-height:55px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding:12px 15px 20px 25px ;

`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
`;

const CommentContainer = styled.div`
  display: flex;
  margin: 0 0 0 8px;
`;

const CommentBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-right: 5px;
`;

const LikeIcon = styled.img`
  width: 20px;
  height: 19px;
  margin-right:6px;

`

const CommentIcon = styled.img`
  width: 20px;
  height: 19px;
  margin-right:6px;

`

const CommentCount = styled.div`
  font-size: 17px;
`;

const LikeCount = styled.div`
  font-size: 17px;
`;


export default CardModal;
