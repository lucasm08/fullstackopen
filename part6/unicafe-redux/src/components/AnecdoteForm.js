import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnnecdote = (event) => {
    event.preventDefault()
    const content = event.target.annecdote.value
    event.target.annecdote.value = ''
    dispatch(createAnnecdote(content))
  }

  return (
    <form onSubmit={addAnnecdote}>
      <input name="annecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm