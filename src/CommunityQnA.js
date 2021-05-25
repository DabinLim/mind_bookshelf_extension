import React from "react";
import styled from "styled-components";
import CardModal from './CardModal';

const CommunityQnA = (props) => {
  console.log(props);
  const [modal, setModal] = React.useState(false)
  const close = () => {
    setModal(false);
  }
  const getDate = (date) => {
    let year = "20" + date.substring(0, 2);
    let month = date.substring(2, 4);
    let day = date.substring(4, 6);
    let full_date = year + "년 " + month + "월 " + day + "일";
    return full_date;
  };
  return (
    <React.Fragment>
      <QnAContainer>
      <div style={{ display: "flex", marginBottom: "12px" }}>
          {props.topic?.map((t) => {
            let topic = "";
            let color = "";
            topic = t;
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
            return (
              <Topic
              href={`https://thinknote.us/topic/${t}`} target='_blank'
                style={{
                  border: `1px solid ${color}`,
                  marginBottom: "5px",
                  color: color
                }}
              >
                #{t}
              </Topic>
            );
          })}
        </div>
        <QuestionBox>
          <Question href={`https://thinknote.us/community/${props.id}`} target='_blank'>{props.contents}</Question>
          {props.answers?.length >= 1 ? (
            <DetailBtn href={`https://thinknote.us/community/${props.id}`} target='_blank'>
              더보기
            </DetailBtn>
          ) : null}
        </QuestionBox>
        <AnswerContainer>
          {props.answers.map((a,idx) => {
            if(idx < 3){
              return (
                <Answer key={idx}>
                  {modal === a.answerId ? <CardModal answerId={a.answerId} close={close}/>:''}
                  <AnswerHeader>
                    <div style={{display:"flex", alignItems:"center",color:'#000000',textDecoration:'none'}}>
                    <AnswerProfileImg onClick={()=>{window.open(`https://thinknote.us/others/${a.userId}`)}} src={a.profileImg} />
                    <AnswerNickname onClick={()=>{window.open(`https://thinknote.us/others/${a.userId}`)}}>{a.nickname}</AnswerNickname>
                    </div>
                  <AnswerContents onClick={() => {setModal(a.answerId)}}>
                    {a.contents}
                  </AnswerContents>
                  </AnswerHeader>
                  <AnswerLikes>
                    <IconBox>
                      <LikeBox>
                        <LikeIcon src='https://user-images.githubusercontent.com/77369674/118684661-5eec6a80-b83d-11eb-8eba-7ad33f5a05e2.png'/>
                        <LikeCount>{a.likeCount}</LikeCount>
                      </LikeBox>
                      <CommentBox>
                      <CommentIcon src="https://user-images.githubusercontent.com/77369674/118684657-5e53d400-b83d-11eb-861f-41aa269aa89e.png" />
                        <CommentCount>{a.commentCount}</CommentCount>
                      </CommentBox>
                    </IconBox>
                    <DateYMD>{getDate(a.answerCreated)}</DateYMD>
                  </AnswerLikes>
                </Answer>
              );
            }
          })}
        </AnswerContainer>
      </QnAContainer>
    </React.Fragment>
  );
};

const QnAContainer = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 60px;

`;

const QuestionBox = styled.div`
  width: 100%;
  display: flex;
  // align-items: center;
  justify-content: space-between;
`;

const Question = styled.a`
  text-decoration:none;
  cursor:pointer;
  color:#000000;
  font: normal normal bold 19px Nanum Myeongjo;
  width: 270px;
`;

const DetailBtn = styled.a`
  color:#000000;
  text-decoration:none;
  padding-top: 5px;
  cursor: pointer;
  font: normal normal normal 14px Noto Sans CJK KR;

  :hover {
    font-weight: bold;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const Answer = styled.div`
  min-width: 200px;
  max-width: 200px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  margin-right: 20px;

  box-shadow: 0px 0px 20px #0000001a;
`;

const AnswerHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 18px 0;
`;

const AnswerProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 40px;
  object-fit: cover;
  cursor:pointer;
`;

const AnswerNickname = styled.div`
  cursor:pointer;
  margin-left: 10px;
  font-family: Noto Sans CJK KR, sans-serif;
`;

const AnswerContents = styled.div`
  cursor:pointer;
  margin-top: 20px;
  font: normal normal normal 12px/18px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #262626;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover{
    font-weight:600;
  }
`;

const AnswerLikes = styled.div`
  padding: 0px 18px;
  border-top: 1px solid #efefef;
  min-height: 37px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  & > div > svg {
    margin-right: 5px;
  }
`;

const LikeIcon = styled.img`
  width:13px;
    height: 12px;
    margin-right: 6px;

  
`

const CommentIcon = styled.img`
  width:13px;
    height: 12px;
    margin-right: 6px;



`

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;
const CommentBox = styled.div`
  display: flex;
  align-items: center;
`;

const DateYMD = styled.div`
  font-size: 11px;
`;

const Topic = styled.a`
  text-decoration:none;
  margin-top: 30px;
  margin-right: 10px;
  cursor: pointer;
  // display: inline-block;
  padding: 5px 0px;
  letter-spacing: 0px;
  border-radius: 18px;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7249b4;
    min-width: 52px;
    max-width: 52px;
    max-height: 30px;
    font-size:12px;
`;

const LikeCount = styled.span`

    font: normal normal normal 13px/19px Noto Sans CJK KR;
  
`;

const CommentCount = styled.span`

    font: normal normal normal 13px/19px Noto Sans CJK KR;
  
`;

export default CommunityQnA;
