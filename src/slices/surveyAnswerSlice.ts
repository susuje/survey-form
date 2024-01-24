import { createSlice } from '@reduxjs/toolkit'

interface SurveyAnswerState {
  answer: {
    required: boolean
    id: number
    title: string
    type: string
    answer: string | string[]
  }[]
}

const initialState: SurveyAnswerState = {
  answer: [],
}

const surveyAnswerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    saveSurveyAnswer: (state, action) => {
      if (state.answer.some(answer => answer.id === action.payload.id)) {
        return undefined
      } else {
        state.answer.push({ ...action.payload })
        console.log(state.answer, 'add')
      }
    },
    updateSurveyAnswer: (state, action) => {
      console.log('설문답변update', action.payload)
      state.answer = state.answer.map(answer =>
        answer.id === action.payload.id
          ? { ...answer, ...action.payload }
          : answer
      )
      console.log(state.answer, 'updated')
    },
  },
})

export const { saveSurveyAnswer, updateSurveyAnswer } =
  surveyAnswerSlice.actions

export default surveyAnswerSlice.reducer
