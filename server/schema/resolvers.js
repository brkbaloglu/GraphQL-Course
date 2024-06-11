const {UserList, MovieList} = require("../FakeData")
const _ = require("lodash")
const resolvers = {
    Query: {
        users: () => {
            if (UserList) return { users: UserList }
            
            return {message: "There was an error"}
        },
        user: (parent, args, context, info) => {
            const userIndex = UserList.findIndex(user => user.id === args.id)
            // console.log(UserList[userIndex]);
            return UserList[userIndex]
        },
        movies: () => MovieList,
        movie: (parent, args) => {
            const movie = MovieList.find(movie => movie.name === args.name)
            return movie 
        }
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = args.input
            const lastUser = UserList[UserList.length - 1]
            user.id = Number(lastUser.id) + 1
            UserList.push(user)
            return user
        } ,

        updateUsername: (parent, args) => {
            const { id, newUsername } = args.input;
            let userUpdated;
            UserList.forEach((user) => {
              if (user.id === id) {
                user.username = newUsername;
                userUpdated = user;
              }
            });
      
            return userUpdated;
          },


          deleteUser: (parent, args) => {
            const id = args.id
            _.remove(UserList, (user) => user.id === id)
            return null
          }
    },

    UsersResult: {
      __resolveType(obj){
        
        if (obj.users){
          return "UsersSuccessfulResult"
        }

        if (obj.message) {
          return "UsersErrorResult"
        }
        return null
      }
    }


}

module.exports = {resolvers}