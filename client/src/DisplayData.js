import React, { useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client"

const QUERY_ALL_USERS = gql`
    query getAllUsers{
        users {
            id
            age
            name
            nationality
            username
        }
    }
`

const QUERY_ALL_MOVIES = gql`
    query getAllMovies{
        movies {
            id
            name
            yearOfPublication
            isInTheaters
        }
    }
`

const GET_MOVIE_BY_NAME = gql`
    query getMovieByName($name: String!){
        movie(name: $name){
            name
            yearOfPublication
            isInTheaters
        }
    }
`

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input){
            name
            username
            age
            nationality
        }

    }   
`

function DisplayData() {

    const [movieSearched, setMovieSearched] = useState("")


    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [age, setAge] = useState(0)
    const [nationality, setNationality] = useState("")


    const { data: userData, loading: userLoading, refetch } = useQuery(QUERY_ALL_USERS)
    const { data: movieData, loading: movieLoading, error: movieError } = useQuery(QUERY_ALL_MOVIES)
    const [fetchMovie, {data: movieSearchedData, error: movieSearchedError}] = useLazyQuery(GET_MOVIE_BY_NAME)

    const [createUser] = useMutation(CREATE_USER_MUTATION)

    if (userLoading) {
        return <h1>Data is loading...</h1>
    }


    if (userData) {
        console.log(userData);
    }

    if (movieError) {
        console.log(movieError);
    }




  return (
    <div>
        <div>
            <input onChange={(event) => setName(event.target.value)} type="text" placeholder='Name' />
            <input onChange={(event) => setUsername(event.target.value)} type="text" placeholder='Username' />
            <input onChange={(event) => setAge(event.target.value)} type="number" placeholder='Age' />
            <input onChange={(event) => setNationality(event.target.value.toUpperCase())} type="text" placeholder='Nationality' />
            <button onClick={() => {
                createUser({
                    variables: {input: {name, username, age: Number(age), nationality}}})
                    refetch()
                }}>Create User</button>

        </div>
        {
            userData &&
            userData.users.map((user) => {
                return (
                <div key={user.id}>
                    <h1>Name: {user.name}</h1>
                    <h1>Username: {user.username}</h1>
                    <h1>Age: {user.age}</h1>
                    <h1>Nationality: {user.nationality}</h1>
                </div>
                )
            })
        }
<hr />
<hr />
        {
            movieData && 
            movieData.movies.map((movie, index) => {
                return (
                    <div key={index}>
                        <h1>Movie Name: {movie.name}</h1>
                        <h1>Year of Publication: {movie.yearOfPublication}</h1>
                        <h1>Is in theaters?: {movie.isInTheaters ? "yes" : "no"}</h1>
                    </div>
                )
            })
        }

        <div>
            <input onChange={(event) => setMovieSearched(event.target.value)} type="text" name="" placeholder='Interstellar...' id="" />
            <button onClick={() => {fetchMovie({variables: {name: movieSearched}})}}>Fetch Data</button>
            <div>
                {
                    movieSearchedData && 
                    <div>
                        <h1>Movie Name: {movieSearchedData.movie.name}</h1>
                        <h1>Year of Publication: {movieSearchedData.movie.yearOfPublication}</h1>
                        <h1>Is In Theaters?: {movieSearchedData.movie.isInTheaters ? "yes" : "no"}</h1>
                    </div>
                }
                {
                    movieSearchedError &&
                    <h1>There was an error fetching a data</h1>
                }
            </div>
        </div>
    </div>
  )
}

export default DisplayData