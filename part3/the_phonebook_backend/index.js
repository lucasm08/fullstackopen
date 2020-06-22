const express = require('express')
const app = express()

app.use(express.json())


const persons =  [

    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Lucas Gompou",
      "number": "1-334-343-3545",
      "id": 5
    },
    {
      "name": "Deftones",
      "number": "1-234-234-2343",
      "id": 6
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })


const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })