import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Api = async page => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://randomuser.me/api/?page=${page}&results=5`,
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

function Users() {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = async (page, users) => {
    setIsLoading(true)
    const response = await Api(page)
    setUsers([...users, ...response.data.results])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers(page, users)
  }, [page])

  const User = ({
    user: {
      name: { first },
      picture: { large },
    },
  }) => <img src={large} alt={first} />

  return (
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {users.map((user, key) => (
            <User key={key} index={key} user={user} />
          ))}
        </div>
      )}
      <button onClick={() => setUsers([])}>Reset users</button>
      <button onClick={() => setPage(page + 1)}>Fetch more users</button>
    </div>
  )
}

ReactDOM.render(<Users />, document.getElementById('root'))
