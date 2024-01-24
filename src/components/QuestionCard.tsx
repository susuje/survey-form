import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import {
  deleteQuestion,
  updateQuestion,
  copyQuestion,
} from '../slices/questionCardslice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'

import checked from '../assets/icon/checked.svg'
import unchecked from '../assets/icon/unchecked.svg'
import upArrow from '../assets/icon/icon-up-arrow.svg'
import downArrow from '../assets/icon/icon-down-arrow.svg'
import OptionsInput from './OptionsInput'
import OptionAdd from './OptionAdd'

type Props = {
  id: number
}

export default function QuestionCard({ id }: Props) {
  const question = useSelector((state: RootState) =>
    state.question.questions.find(q => q.id === id)
  )

  const dispatch = useDispatch()
  const [didUserUpdated, setDidUserUpdated] = useState(false)
  const [type, setType] = useState('객관식 질문')
  const [title, setTitle] = useState('제목없는 질문')
  const [optionList, setOptionList] = useState<string[]>(['옵션 1'])
  const [clicked, setClicked] = useState(false)
  const [isRequired, setisRequired] = useState(false)
  const qTypes = ['단답형', '장문형', '객관식 질문', '체크박스', '드롭다운']

  //드래그 기능
  const dragOpt = useRef<number>(0)
  const draggedOverOpt = useRef<number>(0)

  const handleSort = () => {
    const optionClone = [...optionList]
    const temp = optionClone[dragOpt.current]
    optionClone[dragOpt.current] = optionClone[draggedOverOpt.current]
    optionClone[draggedOverOpt.current] = temp
    setDidUserUpdated(true)
    setOptionList(optionClone)
  }

  //
  const closeDropdown = () => {
    if (clicked) setClicked(false)
  }
  document.addEventListener('click', () => {
    //console.log('doc이벤트실행')
    closeDropdown()
  })

  useEffect(() => {
    //첫 렌더링에서는 실행되면안된다.(초기화되는오류발생) 사용자가 직접 수정할때만 updateQuestion이 실행되어야함!!
    if (didUserUpdated) {
      dispatch(
        updateQuestion({
          title: title,
          type: type,
          optionList: optionList,
          id: id,
          required: isRequired,
        })
      )
      setDidUserUpdated(false)
    }
  }, [type, title, optionList, isRequired])

  useEffect(() => {
    //console.log('hi', id) //첫 렌더링에 실행되고,변경감지때 다시 마운트
    //console.log(question)
    if (question) {
      setType(question.type)
      setTitle(question.title)
      if (type == '단답형' || type == '장문형') {
        setOptionList([''])
      } else {
        setOptionList(question.optionList)
      }
      setisRequired(question.required)
    }
  }, [question])

  const clickType = (e: React.MouseEvent<HTMLElement>) => {
    const targetElement = e.target as HTMLElement
    setDidUserUpdated(true)
    setType(targetElement.innerText)
  }
  const toggleHandler = () => {
    setDidUserUpdated(true)
    setisRequired(!isRequired)
  }
  const handleSelectBarClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setClicked(clicked => !clicked)
  }
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDidUserUpdated(true)
    setTitle(e.target.value)
  }
  return (
    <CardWrapper>
      <FlexDiv>
        <QNameInput type="text" required value={title} onChange={handleTitle} />
        <SelectBar
          onClick={handleSelectBarClick}
          className={clicked ? 'clicked' : ''}
        >
          {type}
          <Ul className={clicked ? 'clicked' : ''}>
            {qTypes.map((type, ind) => {
              return (
                <li onClick={clickType} key={ind}>
                  <button type="button">{type}</button>
                </li>
              )
            })}
          </Ul>
        </SelectBar>
      </FlexDiv>
      {type == '장문형' || type == '단답형' ? (
        <TextInput
          type="text"
          disabled
          placeholder={`${type} 텍스트`}
          className={type}
        />
      ) : (
        <Options>
          {optionList.map((txt, index) => {
            return (
              <OptionInputDiv
                key={index}
                draggable
                onDragStart={() => (dragOpt.current = index)}
                onDragEnter={() => (draggedOverOpt.current = index)}
                onDragEnd={handleSort}
                onDragOver={e => e.preventDefault()}
              >
                <OptionsInput
                  key={index}
                  txt={txt}
                  type={type}
                  index={index}
                  setOptionList={setOptionList}
                  optionList={optionList}
                  setDidUserUpdated={setDidUserUpdated}
                />
              </OptionInputDiv>
            )
          })}
          <OptionAdd
            type={type}
            index={optionList.length}
            optionList={optionList}
            setOptionList={setOptionList}
            setDidUserUpdated={setDidUserUpdated}
          />
        </Options>
      )}
      <FlexDiv className="btns">
        <RequiredDiv>
          <p>필수</p>
          <CheckedIcon
            onClick={toggleHandler}
            className={isRequired ? 'required' : ''}
          ></CheckedIcon>
        </RequiredDiv>
        <FlexDiv>
          <CopyBtn
            onClick={() =>
              dispatch(
                copyQuestion({
                  title: title,
                  type: type,
                  optionList: optionList,
                  required: isRequired,
                  id: Date.now(),
                })
              )
            }
          >
            복사
          </CopyBtn>
          <DeleteBtn
            onClick={() => {
              // console.log('삭제', id)
              dispatch(
                deleteQuestion({
                  id: id,
                })
              )
            }}
          >
            삭제
          </DeleteBtn>
        </FlexDiv>
      </FlexDiv>
    </CardWrapper>
  )
}

//스타일
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

  &.btns {
    margin-top: 20px;
  }
`
const QNameInput = styled.input`
  width: 60%;
  padding: 15px;
  border-bottom: 1px solid #c4c4c4;
  outline: none;
  font-size: 20px;
  background-color: #e9f3ff;
`
const TextInput = styled.input`
  padding: 15px 10px;
  border-bottom: 1px solid #c4c4c4;
  width: 40%;

  &.장문형 {
    width: 70%;
  }
`
const SelectBar = styled.div`
  background: ${`url(${downArrow}) no-repeat calc(100% - 5px) center/ 22px 22px`};
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 54px;
  width: 30%;
  margin-right: 12px;
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
const CopyBtn = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #4d7bff;
  color: white;
  font-size: 16px;
  font-weight: 500;
`
const DeleteBtn = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #8e8d8d;
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
`
const Options = styled.div``
const OptionInputDiv = styled.div`
  margin-bottom: 10px;
`

const RequiredDiv = styled.div`
  display: flex;
  align-items: center;
`
const CheckedIcon = styled.div`
  margin-left: 10px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  background: ${`url(${unchecked}) no-repeat center/ 26px 26px`};

  &.required {
    background: ${`url(${checked}) no-repeat center/ 26px 26px`};
  }
`
