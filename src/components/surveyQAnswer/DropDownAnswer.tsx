import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateSurveyAnswer } from '../../slices/surveyAnswerSlice'
import styled from 'styled-components'
import upArrow from '../../assets/icon/icon-up-arrow.svg'
import downArrow from '../../assets/icon/icon-down-arrow.svg'
type Props = {
  id: number
  optList: string[]
  required: boolean
}
export default function DropDownAnswer({ id, optList, required }: Props) {
  const dispatch = useDispatch()
  const [dropAnswer, setDropAnswer] = useState('선택') //드롭다운 일때
  const [clicked, setClicked] = useState(false) //드롭다운 selectbar
  const handleSelectBarClick = () => {
    //드롭다운
    setClicked(clicked => !clicked)
  }

  const clickDrop = (e: React.MouseEvent<HTMLElement>) => {
    //옵션 클릭시
    const targetElement = e.target as HTMLElement

    setDropAnswer(targetElement.innerText)
  }

  useEffect(() => {
    console.log(dropAnswer)
    if (dropAnswer == '선택') {
      console.log(dropAnswer)
      dispatch(updateSurveyAnswer({ id: id, answer: '', required: required }))
    } else {
      dispatch(
        updateSurveyAnswer({ id: id, answer: dropAnswer, required: required })
      )
    }
  }, [dropAnswer])
  return (
    <SelectBar
      onClick={handleSelectBarClick}
      className={clicked ? 'clicked' : ''}
    >
      {dropAnswer}
      <Ul className={clicked ? 'clicked' : ''}>
        <li onClick={clickDrop}>
          <button type="button">선택</button>
        </li>
        {optList.map(opt => {
          return (
            <li onClick={clickDrop}>
              <button type="button">{opt}</button>
            </li>
          )
        })}
      </Ul>
    </SelectBar>
  )
}

const SelectBar = styled.div`
  background: ${`url(${downArrow}) no-repeat calc(100% - 5px) center/ 22px 22px`};
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 54px;
  width: 30%;
  margin-right: 12px;
  margin-top: 30px;
  border: 1px solid grey;
  border-radius: 5px;
  cursor: pointer;

  &.clicked {
    background: ${`url(${upArrow}) no-repeat calc(100% - 5px) center/ 22px 22px`};
  }
`
export const Ul = styled.ul`
  display: none;

  &.clicked {
    display: block;
    border-radius: 5px;
    border: 1px solid grey;
    width: 100%;
    height: 130px;
    overflow-y: scroll;
    padding-left: 15px;
    background-color: #fff;
    position: absolute;
    z-index: 1;
    top: 60px;
    left: 0;
  }

  li {
    transition: 0.5s all;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    &:hover {
      button {
        transition: 0.1s all;
        background: 10px 10px #f2f2f2;
        border-radius: 20px;
        width: 120px;
      }
    }
    button {
      padding: 10px 0;
      font-size: 16px;
    }
  }
`
