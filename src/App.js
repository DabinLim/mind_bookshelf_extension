import React from 'react';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';
import ReplayIcon from "@material-ui/icons/Replay";
import CommunityQnA from './CommunityQnA';


axios.defaults.baseURL = "https://lkj99.shop";


const App = () => {
  
  const [question_list, setQuestionList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  

  const reload = () => {
    axios
    .get("/ourPlace/cards")
    .then((res) => {
      // console.log(res)
      let question_list = [];
      res.data.result.forEach((_question) => {
        let question = {
          contents: _question.questions.contents,
          nickname: _question.questions.nicname,
          id: _question.questions.questionId,
          topic: _question.questions.topic,
          answers: _question.answers,
        };
        question_list.push(question);
      });
      setQuestionList(question_list);
    })
    .catch((err) => {
      console.log(err);
    });
  }


  React.useEffect(() => {
    axios
    .get("/ourPlace/cards")
    .then((res) => {
      let question_list = [];
      res.data.result.forEach((_question) => {
        let question = {
          contents: _question.questions.contents,
          nickname: _question.questions.nicname,
          id: _question.questions.questionId,
          topic: _question.questions.topic,
          answers: _question.answers,
        };
        question_list.push(question);
      });
      setQuestionList(question_list);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <React.Fragment>
      <Container>
        <CommunityBtn
          disabled={loading}
          onClick={() => {
            reload()
            setLoading(true)
          }}
        >
          <ReplayIcon style={{color:'white'}} fontSize="large" />
        </CommunityBtn>
      <CommunityContainer>
          <CommunityBox>
            {question_list.length
              && question_list.map((q) => {
                  return <CommunityQnA key={q.id} {...q} />;
                })
              }
          </CommunityBox>
      </CommunityContainer>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width:100%;
  max-width:680px;
  min-width:680px;
  height:auto;
  box-sizing:border-box;
  
`;

const CommunityBtn = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  top: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: black;
  z-index: 10;
  cursor: pointer;
`;

const CommunityBox = styled.div`
  box-sizing:border-box;
  width: 100%;
  height:auto;
  padding:0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

    ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    display: none;
    background: none; 
  }

  ::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const CommunityContainer = styled.div`
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 900px) {
    z-index: 20;
  }
`;


export default App;