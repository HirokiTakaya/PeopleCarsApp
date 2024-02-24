import { useQuery } from '@apollo/client'
import { GET_PERSON } from '../graphql/queries'
import PersonCard from '../listItems/PersonCard';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ShowPage = () => {
    const { personId } = useParams()
    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { id: personId },
      });

    if (loading) return "Loading..."
    if (error) return `Error fetching person! (${error.message})`

    if (data && data.person) {
        const { person } = data;
        return (
          <PersonCard
            id={person.id}
            firstName={person.firstName}
            lastName={person.lastName}
          />
        );
      }
      return (
        <>
          <p>Person not found.</p>
          <Link to="/">Go Back Home</Link>
        </>
      )
}

export default ShowPage