import styled from 'styled-components'
import QuestionCard from '../components/QuestionCard'
import SurveyInfo from '../components/SurveyInfo'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestion } from '../slices/questionCardslice'
import { RootState } from '../store'
export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const questions = useSelector((state: RootState) => state.question.questions)
  const handleView = () => {
    if (questions.length == 0) {
      window.alert('질문을 작성해주세요')
    } else {
      navigate('/view')
    }
  }
  return (
    <>
      <Container>
        <SurveyInfo />
        <AddBtn onClick={() => dispatch(addQuestion())}>질문 생성</AddBtn>
        <QWrapper>
          {questions.length === 0 ? <P>질문을 작성해주세요📝</P> : ''}
          {questions.map(question => (
            <QuestionCard key={question.id} id={question.id} />
          ))}
          {questions.length === 0 ? (
            ''
          ) : (
            <ViewBtn onClick={handleView}>미리 보기</ViewBtn>
          )}
        </QWrapper>
      </Container>
    </>
  )
}

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`
const QWrapper = styled.div`
  margin: 0 auto;
  max-width: 790px;
  margin-top: 30px;
`
const P = styled.p`
  margin: 100px 0px;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
`
const AddBtn = styled.button`
  position: fixed;
  right: 50px;
  bottom: 50px;
  font-size: 24px;
  background-color: #4d7bff;
  color: white;

  border-radius: 25px;
  padding: 15px 25px;
`
const ViewBtn = styled.button`
  font-size: 24px;
  background-color: black;
  color: white;
  margin-top: 10px;
  border-radius: 25px;
  padding: 15px 25px;
  margin-bottom: 30px;
`
