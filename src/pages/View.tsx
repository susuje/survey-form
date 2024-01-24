import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import SurveyQCard from '../components/SurveyQCard'

export default function View() {
  //설문지를 미리 볼 수 있는 페이지입니다.
  const navigate = useNavigate()
  const questions = useSelector((state: RootState) => state.question.questions)
  const surveyInfo = useSelector((state: RootState) => state.survey.survey)
  const answer = useSelector((state: RootState) => state.answer.answer)
  const handleSubmit = () => {
    const unanswered = answer.find(
      data => data.required && data.answer.length === 0
    )
    //console.log(unanswered)
    if (unanswered) {
      alert(`${unanswered.title}은(는) 필수 질문입니다.`)
    } else {
      navigate('/mydata')
    }
  }
  return (
    <Container>
      <SurveyInfoWrapper>
        <h1>{surveyInfo.title == '' ? '제목없는 설문지' : surveyInfo.title}</h1>
        {surveyInfo.detail == '' ? '' : <h2>{surveyInfo.detail}</h2>}
      </SurveyInfoWrapper>
      <SurveyWrapper>
        {questions.map(question => (
          <SurveyQCard key={question.id} id={question.id} />
        ))}
      </SurveyWrapper>
      <FlexDiv>
        <SubmitBtn onClick={handleSubmit}>제출</SubmitBtn>

        <DeleteAnswerBtn onClick={() => window.location.reload()}>
          양식 지우기
        </DeleteAnswerBtn>
      </FlexDiv>
    </Container>
  )
}
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`
const SurveyWrapper = styled.div`
  margin: 0 auto;
  max-width: 790px;
  margin-top: 30px;
`
const SurveyInfoWrapper = styled.div`
  margin: 0 auto;
  max-width: 790px;
  //border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 20px;
  background-color: #f1f1f1;
  margin-top: 50px;

  h1 {
    padding: 15px;
    border-bottom: 1px solid #c4c4c4;
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  h2 {
    padding: 5px 5px 5px 15px;
    border-bottom: 1px solid #c4c4c4;
  }
`
const FlexDiv = styled.div`
  margin: 0 auto;
  max-width: 790px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`
const SubmitBtn = styled.button`
  font-size: 20px;
  background-color: #4d7bff;
  color: white;

  border-radius: 25px;
  padding: 10px 25px;
`
const DeleteAnswerBtn = styled.button`
  font-size: 20px;
  background-color: #525252;
  color: white;

  border-radius: 25px;
  padding: 10px 25px;
`
