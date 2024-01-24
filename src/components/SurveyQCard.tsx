import { useState, useEffect } from 'react'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import {
  saveSurveyAnswer,
  updateSurveyAnswer,
} from '../slices/surveyAnswerSlice'
import TextAnswer from './surveyQAnswer/TextAnswer'
import styled from 'styled-components'
import DropDownAnswer from './surveyQAnswer/DropDownAnswer'

type Props = {
  id: number
}
function SurveyQCard({ id }: Props) {
  //사용자가 입력하는칸
  const dispatch = useDispatch()
  const [etcValue, setEtcValue] = useState('') //기타 선택할 경우 사용자가 작성하는 value
  const [checkedOpt, setCheckedOpt] = useState('') //객관식일때
  const [checkedBox, setCheckedBox] = useState<string[]>([]) ////체크박스일때
  const [firstRendered, setFirstRendered] = useState(true)

  const question = useSelector((state: RootState) =>
    state.question.questions.find(q => q.id === id)
  )

  const required = question!.required
  const type = question?.type

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    ////체크박스일때
    let target = e.target.id
    target = target.slice(0, -13)

    if (target == '기타') {
      setCheckedBox(prev => {
        if (prev.includes(`기타: ${etcValue}`)) {
          return prev.filter(option => option !== `기타: ${etcValue}`)
        } else {
          return [...prev, `기타: ${etcValue}`]
        }
      })
    } else {
      setCheckedBox(prev => {
        if (prev.includes(target)) {
          return prev.filter(option => option !== target)
        } else {
          return [...prev, target]
        }
      })
    }
  }
  useEffect(() => {
    dispatch(
      saveSurveyAnswer({
        id: id,
        title: question!.title,
        type: type,
        answer: '',
        required: required,
      })
    )
  }, [])

  useEffect(() => {
    //console.log('기타를 누르셧습니다')
    if (etcValue.length > 0) {
      console.log(etcValue, 'etcValue')
      setCheckedOpt('기타')
      if (type == '객관식 질문') {
        dispatch(updateSurveyAnswer({ id: id, answer: `기타: ${etcValue}` }))
      }
    }
  }, [etcValue])

  useEffect(() => {
    ////체크박스일때
    if (!firstRendered && checkedBox.length == 0) {
      dispatch(updateSurveyAnswer({ id: id, answer: checkedBox }))
    }
    //처음 렌더링시 length가 0일때도  updateSurveyAnswer가 실행됨.그래서 위에코드써줌
    if (checkedBox.length > 0) {
      console.log(checkedBox, 'checkbox')
      dispatch(updateSurveyAnswer({ id: id, answer: checkedBox }))
    } else {
      setFirstRendered(false)
    }
  }, [checkedBox])

  useEffect(() => {
    //객관식 바꿀때마다 확인용
    //etcValue 잘 들어오는지 확인해야함
    if (checkedOpt.length > 0) {
      if (checkedOpt !== '기타') {
        //console.log(checkedOpt)
        dispatch(updateSurveyAnswer({ id: id, answer: checkedOpt }))
      } else {
        //기타일 경우, etcValue를 보낸다
        // console.log(checkedOpt)
        dispatch(updateSurveyAnswer({ id: id, answer: `기타: ${etcValue}` }))
      }
    }
  }, [checkedOpt])

  return (
    <CardWrapper>
      <Title>Q. {question!.title}</Title>
      {required ? <Required>*필수</Required> : ''}
      {type == '장문형' || type == '단답형' ? (
        <TextAnswer id={id} required={required} type={type} />
      ) : (
        ''
      )}
      {type == '객관식 질문' || type == '체크박스' ? (
        <OptionsWrapper>
          {question?.optionList.map((opt, ind) => {
            if (opt == '기타') {
              return (
                <Option key={ind}>
                  <CheckInput
                    type={type == '객관식 질문' ? 'radio' : 'checkbox'}
                    name={id.toString()}
                    required={required}
                    id={opt + id}
                    checked={
                      type == '객관식 질문' ? checkedOpt === '기타' : undefined
                    }
                    onChange={
                      type == '객관식 질문'
                        ? () => setCheckedOpt(opt)
                        : handleCheckbox
                    }
                  />
                  <label htmlFor={opt + id}>{opt} :</label>
                  <EtcInput
                    type="text"
                    required={required}
                    value={etcValue}
                    onChange={e => setEtcValue(e.target.value)}
                  />
                </Option>
              )
            } else {
              return (
                <Option>
                  <CheckInput
                    type={type == '객관식 질문' ? 'radio' : 'checkbox'}
                    name={id.toString()}
                    required={required}
                    id={opt + id}
                    checked={
                      type == '객관식 질문' ? checkedOpt === opt : undefined
                    }
                    onChange={
                      type == '객관식 질문'
                        ? () => setCheckedOpt(opt)
                        : handleCheckbox
                    }
                  />
                  <label htmlFor={opt + id}>{opt}</label>
                </Option>
              )
            }
          })}
        </OptionsWrapper>
      ) : (
        ''
      )}
      {type == '드롭다운' ? ( //required 추가해야할수도?
        <DropDownAnswer
          id={id}
          optList={question!.optionList}
          required={required}
        />
      ) : (
        ''
      )}
    </CardWrapper>
  )
}

export default SurveyQCard

const CardWrapper = styled.div`
  max-width: 790px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
`
const Title = styled.h1`
  margin-bottom: 10px;
`
const Required = styled.span`
  color: red;
  display: block;
  margin-bottom: 10px;
`
const CheckInput = styled.input``
const OptionsWrapper = styled.div``
const Option = styled.div`
  padding: 10px 10px 10px 0px;
  display: flex;
  align-items: center;
  ${CheckInput} {
    width: 20px;
    height: 20px;
  }

  label {
    margin-left: 10px;
  }
`

const EtcInput = styled.input`
  outline: 0;
  padding: 10px;
  width: 50%;
`
