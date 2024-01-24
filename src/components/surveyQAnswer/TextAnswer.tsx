import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateSurveyAnswer } from '../../slices/surveyAnswerSlice'
import styled from 'styled-components'
type Props = {
  id: number
  type: string
  required: boolean
}
export default function TextAnswer({ id, required, type }: Props) {
  const [firstRendered, setFirstRendered] = useState(true)
  const [answer, setAnswer] = useState('')
  const dispatch = useDispatch()
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (!firstRendered && answer.length == 0) {
      dispatch(
        updateSurveyAnswer({ id: id, answer: answer, required: required })
      )
    }
    if (answer.length > 0) {
      console.log(answer, 'answer')
      dispatch(
        updateSurveyAnswer({ id: id, answer: answer, required: required })
      )
    } else {
      setFirstRendered(false)
    }
  }, [answer])

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value)
  }
  const handleResizeHeight = () => {
    if (textRef.current) {
      textRef.current.style.height = 'auto'
      textRef.current.style.height = `${textRef.current.scrollHeight}px`
    }
  }

  return (
    <TextArea
      ref={type == '장문형' ? textRef : undefined}
      onInput={type == '장문형' ? handleResizeHeight : undefined}
      placeholder="내 답변"
      maxLength={type == '장문형' ? undefined : 40}
      rows={type == '장문형' ? undefined : 1}
      required={required}
      onChange={handleTextArea}
    />
  )
}

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px 15px 15px 0px;
`
