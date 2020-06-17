import {SAVE_TITLE,SAVE_NUMBER} from '../action_types'

export const createSaveTitleAction = (title)=> ({type:SAVE_TITLE,data:title})
export const createSaveNumberAction = (number)=> ({type:SAVE_NUMBER,data:number})