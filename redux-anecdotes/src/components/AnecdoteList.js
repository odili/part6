import React from 'react';
import { connect } from 'react-redux';
import { upVote } from '../reducers/anecdoteReducer';
import { arrayObjectSort } from '../utils/arrayObjectSort';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = props => {
  const vote = id => {
    const anecdote = props.anecdotesToShow.find(a => a.id === id);
    props.upVote(id, anecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 10);
  };

  return (
    <>
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const filteredAnecdotes = ({ anecdotes, filter }) => {
  const filtered = anecdotes.filter(a => a.content.includes(filter));
  return filtered.sort(arrayObjectSort('votes', 'desc'));
};

const mapStateToProps = state => {
  return {
    anecdotesToShow: filteredAnecdotes(state),
  };
};
export default connect(mapStateToProps, { upVote, setNotification })(
  AnecdoteList
);
