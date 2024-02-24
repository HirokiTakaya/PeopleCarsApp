import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Title } from './components/layout/Title'
import AddPerson from './components/forms/AddPerson';
import People from './components/lists/People';
import AddCar from './components/forms/AddCar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowPage from './components/forms/ShowPage';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const HomePage = () => (
  <>
    <AddPerson />
    <AddCar />
    <People />
  </>
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          <Title />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people/:personId" element={<ShowPage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App;
