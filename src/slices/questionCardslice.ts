import { createSlice } from '@reduxjs/toolkit'
const getInitialQuestions = () => {
  const localQList = localStorage.getItem('Qstorage')

  if (localQList) {
    //만약 저장된 질문들 있다면 그걸 반환~
    return JSON.parse(localQList)
  }
  localStorage.setItem('Qstorage', JSON.stringify([]))
  return []
}
type QData = {
  id: number
  title: string
  type: string
  optionList: string[]
  required: boolean
}

interface QuestionState {
  questions: {
    id: number
    title: string
    type: string
    optionList: string[]
    required: boolean
  }[]
}

const initialState: QuestionState = {
  questions: getInitialQuestions(), //내가 만든 질문들의 배열
}

const questionCardSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    addQuestion: state => {
      state.questions.push({
        id: Date.now(),
        title: '제목없는 질문',
        type: '객관식 질문',
        optionList: ['옵션 1'],
        required: false,
      })
      const QList = localStorage.getItem('Qstorage')
      console.log(QList)

      if (QList) {
        //로컬에 저장
        const QListArr = JSON.parse(QList)
        QListArr.push({
          id: Date.now(),
          title: '제목없는 질문',
          type: '객관식 질문',
          optionList: ['옵션 1'],
          required: false,
        })
        localStorage.setItem('Qstorage', JSON.stringify(QListArr))
      } else {
        localStorage.setItem(
          'Qstorage',
          JSON.stringify([
            {
              id: Date.now(),
              title: '제목없는 질문',
              type: '객관식 질문',
              optionList: ['옵션 1'],
              required: false,
            },
          ])
        )
      }
    },

    updateQuestion: (state, action) => {
      const QList = localStorage.getItem('Qstorage')
      console.log('update', QList)

      if (QList) {
        const QListArr = JSON.parse(QList)
        QListArr.forEach((Q: QData) => {
          if (Q.id === action.payload.id) {
            Q.title = action.payload.title
            Q.type = action.payload.type
            Q.optionList = action.payload.optionList
            Q.required = action.payload.required
          }
        })
        localStorage.setItem('Qstorage', JSON.stringify(QListArr))

        state.questions = state.questions.map(question =>
          question.id === action.payload.id
            ? { ...question, ...action.payload }
            : question
        )
      }
    },
    deleteQuestion: (state, action) => {
      //console.log(action.payload, 'delete')
      const QList = localStorage.getItem('Qstorage')
      if (QList) {
        const QListArr = JSON.parse(QList)
        console.log(QListArr)
        QListArr.forEach((q: QData, index: number) => {
          //console.log(note.id, action.payload)
          if (q.id == action.payload.id) {
            QListArr.splice(index, 1)
          }
        })
        window.localStorage.setItem('Qstorage', JSON.stringify(QListArr))
        state.questions = QListArr
      }
    },
    copyQuestion: (state, action) => {
      const QList = localStorage.getItem('Qstorage')
      state.questions.push({
        ...action.payload,
      })

      if (QList) {
        const QListArr = JSON.parse(QList)
        QListArr.push({ ...action.payload })
        localStorage.setItem('Qstorage', JSON.stringify(QListArr))
      }

      // console.log('추가완료')
    },
  },
})

export const { addQuestion, updateQuestion, deleteQuestion, copyQuestion } =
  questionCardSlice.actions

export default questionCardSlice.reducer
