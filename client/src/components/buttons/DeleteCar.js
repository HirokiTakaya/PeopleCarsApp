import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { DELETE_CAR, GET_CARS } from '../graphql/queries'
import filter from 'lodash.filter'

const DeleteCar = ({ id }) => {
    const [deleteCar] = useMutation(DELETE_CAR)

    const handleButtonClick = () => {
        let result = window.confirm(`Delete car?`)

        if (result) {
            deleteCar({
                variables: {
                    id
                },
                update: (cache, { data: { deleteCar } }) => {
                    const { cars } = cache.readQuery({ query: GET_CARS })
                    cache.writeQuery({
                        query: GET_CARS,
                        data: {
                            cars: filter(cars, c => {
                                return c.id !== deleteCar.id
                            })
                        }
                    })
                }
            })
        }
    }

    return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick}/>
}

export default DeleteCar