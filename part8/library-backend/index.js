const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./config')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

mongoose.connect(config.DB_URL, config.options).then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
  }

  type Token {
  value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int! 
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(title: String!,
            author: String!,
            published: Int!
            genres: [String!]!
    ): Book
    editAuthor(
      name: String!, 
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    me: async (_, __, context) => context.currentUser,
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) =>  {
      let author
      if(args.author){
        author = await Author.findOne({name: args.author})
        if(!author) return []
      } 
      
      let param 
      if(!args.author && !args.genre) {
        param = {}
      }else if(args.genre && args.author){
        param = {
          author: author.id,
          genres: { $elemMatch: { $eq: args.genre } }
        }
      }else if(!args.genre) {
        param = {
          author: author.id
        }
      }else if(!args.author){
        param = {
          genres: { $elemMatch: { $eq: args.genre } }
        }
      }
      return Book.find(param).populate('author')
    },
    allAuthors: async () => await Author.find({}),
  },
  Mutation: {
    login:  async (_, args) => {
      const user = await User.findOne({username: args.username})

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: 60*60 }) }
    },
    createUser: async (_, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})
  
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    addBook: async (_, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({name: args.author})

      if(!author){
        try {
          author = new Author({name: args.author})
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      
      let book
      try {
        book = new Book({ ...args, author: author._id})
        await book.save() 
        const count = await Book.find({author: author.id}).countDocuments()
        await Author.findOneAndUpdate({name: args.author}, {bookCount: count})
        book = await book.populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },
    editAuthor: async (_, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const found = await Author.findOne({name: args.name})
      
      if(!found){
        return null
      }

      try {
        const author = await Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo}, {new: true})
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7).toString(), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})