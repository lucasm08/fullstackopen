const mongoose = require('mongoose')

if (process.argv.length < 5) {
  console.log('Please these arguments must be provided : node mongo.js <password> <person-name> <person-phonenumber>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://lucasm08:${password}@cluster0-y1ufw.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number 
})

person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    Person
    .find({})
    .then(persons=> {
        console.log('phonebook:')
        persons.map(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })  
})


