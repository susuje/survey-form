import { configureStore } from '@reduxjs/toolkit'
import questionCardsReducer from './slices/questionCardslice'
import surveyInfoReducer from './slices/surveyInfoSlice'
import surveyAnswerReducer from './slices/surveyAnswerSlice'
export const store = configureStore({
  reducer: {
    question: questionCardsReducer,
    survey: surveyInfoReducer,
    answer: surveyAnswerReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
