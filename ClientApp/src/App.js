import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge, Button, Row, Col } from 'reactstrap'
import * as moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import { actionCreators } from './actions'

const App = () => {
    const dispatch = useDispatch()
    const plants = useSelector((state) => state.plants)
    const selectedPlantIds = useSelector((state) => state.selectedPlantIds)
    const disabledPlantIds = useSelector((state) => state.disabledPlantIds)

    async function fetchData() {
        const response = await fetch('api/plants')
        const plantsData = await response.json()
        dispatch(actionCreators.setPlants(plantsData))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const waterPlants = (plantIds) => {
        plantIds.forEach(async (id, index, array) => {
            const { lastWatered } = plants.find((plant) => plant.id === id)
            if (moment().diff(moment(lastWatered), 'seconds') < 30) return
            await fetch(`api/plants/${id}`, { method: 'PUT' })
            dispatch(actionCreators.disablePlant(id))
            setTimeout(() => {
                dispatch(actionCreators.enablePlant(id))
            }, 30 * 1000)
            if (index === array.length - 1) fetchData()
        })
    }

    const onWaterSelectedPlants = () => {
        waterPlants(selectedPlantIds)
        dispatch(actionCreators.deselectAllPlants())
    }

    const onWaterDangerouslyThirstyPlantsPress = () => {
        waterPlants(plants.reduce((acc, plant) => (
            moment().diff(moment(plant.lastWatered), 'hours') >= 6 ? [...acc, plant.id] : acc
        ), []))
    }

    return (
        <Container className="pt-5">
            <Button
                className="mr-1"
                color="primary"
                disabled={selectedPlantIds.length === 0}
                onClick={onWaterSelectedPlants}
            >
                Water Selected Plants
            </Button>
            <Button
                color="primary"
                disabled={!plants.some(({ lastWatered }) => (moment().diff(moment(lastWatered), 'hours') >= 6))}
                onClick={onWaterDangerouslyThirstyPlantsPress}
            >
                Water Dangerously Thirsty Plants
            </Button>
            <ListGroup className="pt-2">
                {plants.map(({ id, lastWatered }) => {
                    const momentLastWatered = moment(lastWatered)
                    const hoursSinceLastWatered = moment().diff(momentLastWatered, 'hours')
                    const color = () => {
                        if (hoursSinceLastWatered >= 6) return 'danger'
                        return ''
                    }
                    const isSelected = selectedPlantIds.includes(id)
                    return (
                        <ListGroupItem key={id} color={color()}>
                            <Row>
                                <Col xs="2">
                                    <Button
                                        disabled={disabledPlantIds.includes(id)}
                                        active={isSelected}
                                        onClick={() => {
                                            dispatch(actionCreators.togglePlantSelected(id))
                                        }}
                                    >
                                        {isSelected ? 'Deselect' : 'Select'}
                                    </Button>
                                </Col>
                                <Col>
                                    <ListGroupItemHeading>
                                        {`Plant #${id}`}
                                    </ListGroupItemHeading>
                                    <ListGroupItemText>
                                        {`Last Watered: ${momentLastWatered.format('MMM DD, YYYY - hh:mm:ss A')}`}
                                        {' '}
                                        {hoursSinceLastWatered >= 6 && <Badge color="danger">{`${hoursSinceLastWatered} hours ago`}</Badge>}
                                    </ListGroupItemText>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
        </Container>
    )
}

export default App

