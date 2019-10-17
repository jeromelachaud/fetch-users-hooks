import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Api = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://randomuser.me/api/?page=1&results=25`,
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = async () => {
    setIsLoading(true)
    const response = await Api()
    setUsers(response.data.results)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const User = function({
    user: {
      name: { first },
      picture: { large },
    },
  }) {
    return (
      <figure>
        <img src={large} alt={first} />
        <figcaption>{first}</figcaption>
      </figure>
    )
  }

  return (
    <div className="users">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <React.Fragment>
          {users.map((user, key) => (
            <User key={key} index={key} user={user} />
          ))}
        </React.Fragment>
      )}
    </div>
  )
}

ReactDOM.render(<Users />, document.getElementById('root'))
