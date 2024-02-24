import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { DELETE_PERSON, DELETE_PERSON_CARS, GET_PEOPLE } from '../graphql/queries'
import filter from 'lodash.filter'

const DeletePerson = ({ id }) => {
    const [deletePerson] = useMutation(DELETE_PERSON)
    const [deletePersonCars] = useMutation(DELETE_PERSON_CARS)

    const handleButtonClick = () => {
        let result = window.confirm(`Delete person?`)

        if (result) {
            deletePerson({
                variables: {
                    id
                },
                update: (cache, { data: { deletePerson } }) => {
                    const {　people } = cache.readQuery({ query: GET_PEOPLE })
                    cache.writeQuery({
                        query: GET_PEOPLE,
                        data: {
                            people: filter(people, p => {
                                return p.id !== deletePerson.id
                            })
                        }
                    })
                }
            })
            deletePersonCars({
                variables: {
                    personId: id
                }
            })
        }
    }

    return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick}/>
}

export default DeletePerson