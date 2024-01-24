import { createSlice } from '@reduxjs/toolkit'

const getInitialSurveyInfo = () => {
  const localSurveyInfo = localStorage.getItem('Infostorage')

  if (localSurveyInfo) {
    console.log(localSurveyInfo, 'hi')
    //만약 저장된 설문지 제목및설명이 있다면 그걸 반환~
    return JSON.parse(localSurveyInfo)
  }
  localStorage.setItem('Infostorage', JSON.stringify({}))
  return {}
}

interface SurveyState {
  survey: {
    title: string
    detail: string
  }
}

const initialState: SurveyState = {
  survey: getInitialSurveyInfo(),
}

const surveyInfoSlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    saveSurveyInfo: (state, action) => {
      // console.log(action.payload, 'SurveySlice')
      state.survey.title = action.payload.title
      state.survey.detail = action.payload.detail
      //console.log(state.survey)

      //
      const SurveyData = window.localStorage.getItem('Infostorage')
      if (SurveyData) {
        const SurveyInfo = JSON.parse(SurveyData)
        SurveyInfo.title = action.payload.title
        SurveyInfo.detail = action.payload.detail
        localStorage.setItem('Infostorage', JSON.stringify(SurveyInfo))
      }
    },
  },
})

export const { saveSurveyInfo } = surveyInfoSlice.actions

export default surveyInfoSlice.reducer
