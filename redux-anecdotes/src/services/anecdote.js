import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async content => {
  const obj = asObject(content);
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const vote = async (id, anecdote) => {
  const upvoted = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, upvoted);
  return response.data;
};

export default {
  getAll,
  create,
  vote,
};
