import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnnecdote} from '../reducers/anecdoteReducer'
import lodash from 'lodash'


const Annecdote = ({ annecdote, handleClick }) => {
    return(
      <li>
        {annecdote.content} <br/>
  
        has {annecdote.votes} <button onClick={handleClick}>vote</button>
      </li>
    )
}


const AnnecdoteList = () => {

    const dispatch = useDispatch()
    const annecdotes = useSelector(state => state)  
    return (
        <ul>
        {lodash.orderBy(annecdotes, ['votes'], ['desc']).map(annecdote =>
            <Annecdote
            key={annecdote.id}
            annecdote={annecdote}
            handleClick={() => 
                dispatch(voteAnnecdote(annecdote.id))
            }
            />
        )}
        </ul>
    )

}

export default AnnecdoteList;
  