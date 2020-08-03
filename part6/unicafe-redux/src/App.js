import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <br />
      <AnecdoteList />
      <br />
      <AnecdoteForm />
    </div>
  );
};

export default App;
