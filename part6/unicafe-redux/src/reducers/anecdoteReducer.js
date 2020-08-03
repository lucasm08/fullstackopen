
  const annecdoteReducer = (state =[ ], action) => {
    console.log(action)
    switch(action.type) {
      case 'NEW_ANNECDOTE':
          return [...state, action.data]
      case 'VOTE_ANNECDOTE': {
        const id = action.data.id
        const annecdoteToChange = state.find(a => a.id === id)
        const changedAnnecdote = { 
          ...annecdoteToChange, 
          votes: annecdoteToChange.votes + 1
        }
        console.log()
        return state.map(annecdote =>
          annecdote.id !== id ? annecdote : changedAnnecdote
        )
       }
      default:
        return state
    }
    
  }



  const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))


  export const createAnnecdote = (content) => {
    return {
        type: 'NEW_ANNECDOTE',
        data: {
          content,
          votes: 0,
          id: generateId()
        }
    }
  }


  export const voteAnnecdote = (id) => {
      return  {
        type: 'VOTE_ANNECDOTE',
        data: { id }
      }
  }
  
  export default annecdoteReducer