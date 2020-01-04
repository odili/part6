import anecdoteService from '../services/anecdote';

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      let voted = state.find(anec => anec.id === action.data.id);
      voted = { ...voted, votes: voted.votes + 1 };
      return state.map(anec => (anec.id !== action.data.id ? anec : voted));

    case 'NEW_ANECDOTE':
      return state.concat(action.data);

    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const upVote = (id, anecdote) => {
  return async dispatch => {
    const upvoted = await anecdoteService.vote(id, anecdote);
    dispatch({
      type: 'VOTE',
      data: { id: upvoted.id },
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};
export default anecdoteReducer;
