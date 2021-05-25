import React from "react";
import styled from "styled-components";
import reactStringReplace from "react-string-replace";
import { time } from "./Time";


const Comment = (props) => {

  let timeFormat =
    props.commentCreatedAt !== "방금전"
      ? time(props.commentCreatedAt)
      : "방금 전";

  let contents = props.commentContents;
  props.tag.map((t) => {
    contents = reactStringReplace(contents, `@${t[0]}`, (match, i) => (
      <span
        key={t[1]}
        style={{ color: "#37628B", cursor: "pointer" }}
        onClick={()=>{window.open(`https://thinknote.us/others/${t[1]}`)}}
      >
        {match}
      </span>
    ));
  });

  return (
    <CommentFrame>
      <CommentProfileInfo>
        <div style={{display:'flex',flexDirection:'row'}}>
          <CommentProfile
            onClick={() => {window.open(`https://thinknote.us/others/${props.userId}`)}}
            src={props.profileImg}
          />
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <CommentProfileName onClick={() => {window.open(`https://thinknote.us/others/${props.userId}`)}} style={{cursor: "pointer"}}>{props.nickname}</CommentProfileName>
          </div>
        </div>
      </CommentProfileInfo>
      <CommentContent>{contents}</CommentContent>
      <CommentBottom>
        <TimeIndicator>{timeFormat}</TimeIndicator>
        <LikeCount>좋아요 {props.commentLikeCount}개</LikeCount>
      </CommentBottom>
    </CommentFrame>
  );
};

const CommentFrame = styled.div`
  width: 260px;
  padding: 10px 10px 5px 10px;
  margin-bottom: 5px;
  :hover {
    background: #fef2f4;
  }
`;

const CommentProfileInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CommentProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
  :hover {
    cursor: pointer;
  }
`;

const CommentProfileName = styled.span`
  margin-left: 8px;
  font: normal normal bold 13px/18px Noto Sans CJK KR;
  letter-spacing: 0px;
`;

const CommentContent = styled.p`
  margin: 3px 0 0 38px;
  font: normal normal normal 13px/18px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #000000;
`;

const TimeIndicator = styled.span`
  margin:0 0 0 38px;
  font: normal normal normal 12px/16px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #c4c4c4;
`;

const LikeCount = styled.span`
  margin-left:10px;
  font: normal normal bold 12px/16px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #c4c4c4;
`;

const CommentBottom = styled.div`
  margin-top:9px;
  display: flex;
  justify-content: flex-start;
  align-items:center;
`;

export default Comment;
