//import { useState, useEffect } from 'react'
import styled from 'styled-components'
import circle from '../assets/icon/circle.svg'
import rec from '../assets/icon/rec.svg'
import deleteIcon from '../assets/icon/icon-delete.svg'
type Props = {
  txt: string
  type: string
  index: number
  optionList: string[]
  setOptionList: React.Dispatch<React.SetStateAction<string[]>>
  setDidUserUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OptionsInput({
  txt,
  type,
  index,
  optionList,
  setOptionList,
  setDidUserUpdated,
}: Props) {
  const deleteOption = () => {
    setDidUserUpdated(true)
    setOptionList(optionList.filter((_, i) => i !== index))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('dd')
    setDidUserUpdated(true)
    const newOptionList = [...optionList]
    newOptionList[index] = e.target.value
    setOptionList(newOptionList)
  }
  return (
    <>
      <InputDiv>
        <FlexDiv>
          {type === '객관식 질문' || type === '체크박스' ? (
            <Icon type={type} />
          ) : (
            <DropIndex>{index + 1}</DropIndex>
          )}
          <Input
            type="text"
            value={optionList[index]}
            onChange={handleChange}
            readOnly={txt == '기타' ? true : false}
          />
        </FlexDiv>
        {index === 0 ? '' : <Delete onClick={deleteOption}></Delete>}
      </InputDiv>
    </>
  )
}
const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`
const Icon = styled.div<{ type: string }>`
  width: 20px;
  height: 20px;
  background: ${props =>
      props.type === '객관식 질문' ? `url(${circle})` : `url(${rec})`}
    no-repeat left / 16px 16px;
`
const DropIndex = styled.p`
  font-weight: 700;
`
const Input = styled.input`
  display: inline-block;
  outline: 0;
  padding: 10px;
`
const Delete = styled.button`
  width: 22px;
  height: 22px;
  background: ${`url(${deleteIcon}) no-repeat center/ 22px 22px`};
`
