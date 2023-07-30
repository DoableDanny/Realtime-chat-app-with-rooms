import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RoomAndUsers = ({ socket, username, room, backgroundColor }) => {
  const [roomUsers, setRoomUsers] = useState([])
  const [color, setColor] = useState('white')

  const navigate = useNavigate()
  const handleColorChange = (event) => {
    setColor(event.target.value)
  }

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log(data)
      setRoomUsers(data)
    })

    return () => socket.off('chatroom_users')
  }, [socket])

  const leaveRoom = () => {
    const __createdtime__ = Date.now()
    socket.emit('leave_room', { username, room, __createdtime__ })
    // Redirect to home page
    navigate('/', { replace: true })
  }

  return (
    <div
      className={styles.roomAndUsersColumn}
      style={{ backgroundColor: color }}
    >
      <h2 className={styles.roomTitle}>{room}</h2>
      <input type="color" onChange={handleColorChange} />
      <br></br>
      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className="btn btn-outline" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  )
}

export default RoomAndUsers
