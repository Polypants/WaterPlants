export const actionTypes = {
    TOGGLE_PLANT_SELECTED: 'TOGGLE_PLANT_SELECTED',
    SET_PLANTS: 'SET_PLANTS',
    DESELECT_ALL_PLANTS: 'DESELECT_ALL_PLANTS',
    DISABLE_PLANT: 'DISABLE_PLANT',
    ENABLE_PLANT: 'ENABLE_PLANT',
}

export const actionCreators = {
    togglePlantSelected: (id) => ({ type: actionTypes.TOGGLE_PLANT_SELECTED, payload: id }),
    setPlants: (plants) => ({ type: actionTypes.SET_PLANTS, payload: plants }),
    deselectAllPlants: () => ({ type: actionTypes.DESELECT_ALL_PLANTS }),
    disablePlant: (id) => ({ type: actionTypes.DISABLE_PLANT, payload: id }),
    enablePlant: (id) => ({ type: actionTypes.ENABLE_PLANT, payload: id }),
}