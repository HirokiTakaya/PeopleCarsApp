import { useQuery } from "@apollo/client"
import { GET_PERSON_CARS } from "../graphql/queries"
import { List } from 'antd'
import CarCard from "../listItems/CarCard"

const PersonCars = props => {
  const { personId } = props
  const styles = getStyles()
  const { loading, error, data } = useQuery(GET_PERSON_CARS, {
    variables: { personId },
  });

  if (loading) return "Loading..."
  if (error) return `Error fetching cars! (${error.message})`

  return (
    <List grid={{ gutter:20, column:1 }} style={styles.list}>
      {data.personCars.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
          <CarCard
            id={id}
            year={year}
            make={make}
            model={model}
            price={price}
            personId={personId}
          />
        </List.Item>
      ))}
    </List>
  )
}

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export default PersonCars
