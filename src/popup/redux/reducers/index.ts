import { combineReducers } from 'redux'

import { appearance } from './appearance'

export const rootReducer = combineReducers({ appearance })

export type RootState = ReturnType<typeof rootReducer>
