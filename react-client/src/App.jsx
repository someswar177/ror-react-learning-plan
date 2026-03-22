import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.users.map(({ id, name, email }) => (
    <div key={id}>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  ));
}

export default App;