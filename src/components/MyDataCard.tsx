import styled from 'styled-components'

import { useSelector } from 'react-redux'
import { RootState } from '../store'
type Props = {
  id: number
}
export default function MyDataCard({ id }: Props) {
  const answer = useSelector((state: RootState) =>
    state.answer.answer.find(q => q.id === id)
  )

  return (
    <CardWrapper>
      <FlexDiv>
        <Title>Q. {answer!.title}</Title>
        <Type>Type: {answer!.type}</Type>
      </FlexDiv>
      {answer!.answer == '' ? (
        <Answer className="choice">제출한 답변이 없습니다.</Answer>
      ) : (
        <>
          <Answer>답변 : </Answer>
          {typeof answer!.answer == 'object' ? (
            answer!.answer.map(el => <Answer className="choice">{el}</Answer>)
          ) : (
            <Answer className="choice">{answer!.answer}</Answer>
          )}
        </>
      )}
    </CardWrapper>
  )
}
const CardWrapper = styled.div`
  max-width: 790px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
`
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.p`
  margin-bottom: 40px;
  padding-bottom: 10px;
  border-bottom: 3px solid #c4c4c4;
`
const Type = styled.p``
const Answer = styled.p`
  &.choice {
    font-weight: 600;
    margin: 15px 0px;
  }
`
