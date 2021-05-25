import React from "react";
import styled from "styled-components";
import Comment from './Comment';

const CommentList = (props) => {

  return (
    <CommentContainer>
      {props.comment_list?.map((c, idx) => {
        return (
          <>
            <Comment key={idx} {...c} />
          </>
        );
      })}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  overflow-y:scroll;
  border-top-right-radius: 50px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default CommentList;
