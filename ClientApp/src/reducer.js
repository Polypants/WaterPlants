import * as moment from 'moment'

import { actionTypes } from './actions'

const reducer = (state = { selectedPlantIds: [], disabledPlantIds: [], plants: [] }, action) => {
    switch (action.type) {
        case actionTypes.DISABLE_PLANT: {
            return { ...state, disabledPlantIds: [...state.disabledPlantIds, action.payload] }
        }
        case actionTypes.ENABLE_PLANT: {
            return { ...state, disabledPlantIds: state.disabledPlantIds.filter((id) => id !== action.payload) }
        }
        case actionTypes.SET_PLANTS:
            return {
                ...state,
                plants: action.payload,
                disabledPlantIds: action.payload.reduce((acc, plant) => (
                    moment().diff(moment(plant.lastWatered), 'seconds') < 30 ? [...acc, plant.id] : acc
                ), [])
            }
        case actionTypes.TOGGLE_PLANT_SELECTED: {
            if (state.selectedPlantIds.includes(action.payload))
                return { ...state, selectedPlantIds: state.selectedPlantIds.filter((id) => id !== action.payload) }
            return { ...state, selectedPlantIds: [...state.selectedPlantIds, action.payload] }
        }
        case actionTypes.DESELECT_ALL_PLANTS:
            return { ...state, selectedPlantIds: [] }
        default:
            return state
    }
}

export default reducer
