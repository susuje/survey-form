import { useState, useEffect } from 'react'
import styled from 'styled-components'
import circle from '../assets/icon/circle.svg'
import rec from '../assets/icon/rec.svg'
type Props = {
  type: string
  index: number
  setDidUserUpdated: React.Dispatch<React.SetStateAction<boolean>>
  setOptionList: React.Dispatch<React.SetStateAction<string[]>>
  optionList: string[]
}

export default function OptionAdd({
  type,
  index,
  setOptionList,
  setDidUserUpdated,
  optionList,
}: Props) {
  const [isEtcAdded, setIsEtcAdded] = useState(false)
  const optionAdd = () => {
    setDidUserUpdated(true)
    console.log(isEtcAdded)
    if (isEtcAdded) {
      setOptionList(prev => [...prev, `옵션 ${index}`])
    } else {
      setOptionList(prev => [...prev, `옵션 ${index + 1}`])
    }
  }
  const etcAdd = () => {
    setDidUserUpdated(true)
    setOptionList(prev => [...prev, '기타'])
    setIsEtcAdded(true)
  }
  useEffect(() => {
    if (optionList.includes('기타')) {
      setIsEtcAdded(true)
    } else {
      setIsEtcAdded(false)
    }
  }, [optionList])

  return (
    <>
      <Div>
        {type === '객관식 질문' || type === '체크박스' ? (
          <Icon type={type} />
        ) : (
          <DropIndex>{index + 1}</DropIndex>
        )}
        <AddDiv>
          <span className="optionAdd" onClick={optionAdd}>
            옵션추가
          </span>
          {!isEtcAdded && (type === '객관식 질문' || type === '체크박스') ? (
            <>
              &nbsp;또는&nbsp;
              <span className="etcAdd" onClick={etcAdd}>
                '기타' 추가
              </span>
            </>
          ) : (
            ''
          )}
        </AddDiv>
      </Div>
    </>
  )
}
const Div = styled.div`
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
const AddDiv = styled.div`
  padding: 10px;

  span.optionAdd {
    color: #595959;
    border-bottom: 1px solid #595959;
  }
  span.etcAdd {
    color: #4d7bff;
  }
`
