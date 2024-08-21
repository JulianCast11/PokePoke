//aca se comunica con PokeApi
const API_URL = 'https://pokeapi.co/api/v2';

async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export { fetchData };
