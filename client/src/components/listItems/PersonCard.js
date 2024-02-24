import { Card } from 'antd'
import DeletePerson from '../buttons/DeletePerson'
import { useState } from 'react'
import UpdatePerson from '../forms/UpdatePerson'
import { EditOutlined } from '@ant-design/icons'
import PersonCars from '../lists/PersonCars'

const PersonCard = props => {
    const styles = getStyles()
    const { id, firstName, lastName } = props
    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    return (
        <div>
            { editMode? (
                <UpdatePerson 
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    onButtonClick={handleButtonClick}
                />
            ) : (
                <Card
                    title={`${firstName} ${lastName}`} 
                    style={styles.card}
                    actions={[
                        <EditOutlined keys='edit' onClick={handleButtonClick} />,
                        <DeletePerson id={id} />
                    ]}>
                    <PersonCars personId={id} />
                    <a href="#">Learn More</a>
                </Card>
            )}
        </div>
    )
}

const getStyles = () => ({
    card: {
        width: '1000px'
    },
    innercard: {
        marginTop: 10
    }

})

export default PersonCard