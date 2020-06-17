import {SAVE_TITLE, SAVE_NUMBER} from '../action_types'

const saveTitle = function(preState='',action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_TITLE:
			newState = data
			return newState
		default:
			return preState
	}
}
const saveNumber = function(preState='1',action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_NUMBER:
			newState = data
			return newState
		default:
			return preState
	}
}

export {
	saveTitle,
	saveNumber
}