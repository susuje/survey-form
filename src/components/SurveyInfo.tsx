import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { saveSurveyInfo } from '../slices/surveyInfoSlice'
import { RootState } from '../store'
function SurveyInfo() {
  const surveyInfo = useSelector((state: RootState) => state.survey)
  const [title, setTitle] = useState(
    surveyInfo.survey.title ? surveyInfo.survey.title : '제목없는 설문지'
  )
  const [detail, setDetail] = useState(surveyInfo.survey.detail)
  const dispatch = useDispatch()

  useEffect(() => {
    //console.log('고')
    dispatch(
      saveSurveyInfo({
        title: title,
        detail: detail,
      })
    )
  }, [title, detail])

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const handleDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value)
  }
  return (
    <SurveyInfoWrapper>
      <TitleInput type="text" required value={title} onChange={handleTitle} />
      <DetailInput
        type="text"
        value={detail}
        onChange={handleDetail}
        placeholder="설문지 설명"
      />
    </SurveyInfoWrapper>
  )
}

export default SurveyInfo

const SurveyInfoWrapper = styled.div`
  margin: 0 auto;
  max-width: 790px;
  //border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 20px;
  background-color: #f1f1f1;
  margin-top: 50px;
`
const TitleInput = styled.input`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #c4c4c4;
  outline: none;
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 600;

  &:focus {
    border-bottom: 2px solid black;
  }
`
const DetailInput = styled.input`
  width: 100%;
  padding: 5px 5px 5px 15px;
  border-bottom: 1px solid #c4c4c4;
  outline: none;

  &:focus {
    border-bottom: 2px solid black;
  }
`
