import { useSelector } from 'react-redux'
import { RootState } from '../store'

import styled from 'styled-components'

import MyDataCard from '../components/MyDataCard'

export default function MyData() {
  //View 페이지에서 제출 누르면 제출한데이터가 표시되는 페이지
  const myAnswers = useSelector((state: RootState) => state.answer.answer)

  return (
    <Container>
      <SurveyInfoWrapper>
        <h1>제출한 데이터</h1>
      </SurveyInfoWrapper>
      <SurveyWrapper>
        {myAnswers.map(data => (
          <MyDataCard id={data.id} key={data.id} />
        ))}
      </SurveyWrapper>
    </Container>
  )
}
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
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
`
const SurveyWrapper = styled.div`
  margin: 0 auto;
  max-width: 790px;
  margin-top: 30px;
`
