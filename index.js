const { gql, ApolloServer } = require("apollo-server")
const { v4 } = require("uuid")
const persons =  [
    {
        id:1,
        name:'Seb',
        phone:3006153722,
        address:'Kra 23 # 43-05',

    },
    {
        id:3,
        name:'Santiago',
        phone:302853212,
        address:'Kra 45 # 43-1',
        
    },
    {
        id:10,
        name:'Jorge',
        phone:3012340212,
        address:'Kra 12 # 11-05',
        
    }
]
const typeDefs = gql`

    type Person{
        id:ID!
        name:String!
        phone:Float!
        address:String!
    },

    type Query {
        personsCount: Int!
        allPersons: [Person]!
        findPerson(name:String!):Person
    }
    input PersonInput {
        name:String!
        phone:Float!
        address:String!
    }
    type Mutation {
        addPerson(personData:PersonInput): Person
    }
`

const resolvers = {
    Query:{
        personsCount:() => {
            return persons.length
        },
        allPersons: () => {
            return persons
        },
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    }, 
    Mutation:{
        addPerson: (root, {personData})=> {
            const person = {...personData, id:v4()}
            persons.push(person)
            return person
        }
    }
}

const server = new ApolloServer({
    resolvers,
    typeDefs
})
server.listen()
.then(({url})=>console.log(url))