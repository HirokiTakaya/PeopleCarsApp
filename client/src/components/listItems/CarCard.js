import { Card } from 'antd'
import DeleteCar from '../buttons/DeleteCar'
import { useState } from 'react'
import UpdateCar from '../forms/UpdateCar'
import { EditOutlined } from '@ant-design/icons'

const CarCard = props => {
    const styles = getStyles()
    const { id, year, make, model, price, personId } = props
    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    return (
        <div>
            { editMode? (
                <UpdateCar 
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    onButtonClick={handleButtonClick}
                />
            ) : (
                <Card
                    title={`${year} ${make} ${model} -> $${price}`} 
                    style={styles.card}
                    type="inner"
                    actions={[
                        <EditOutlined keys='edit' onClick={handleButtonClick} />,
                        <DeleteCar id={id} />
                    ]}>
                </Card>
            )}
        </div>
    )
}

const getStyles = () => ({
    card: {
        marginTop: 10,
        width: '900px'
    }
})

export default CarCard