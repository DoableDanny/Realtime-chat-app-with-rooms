import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import addPanelImage from './apis/addImage'
//import { useMutation, useQueryClient } from '@tanstack/react-query'

const RoomAndUsers = ({ socket, username, room }) => {
  //const queryClient = useQueryClient()
  const [roomUsers, setRoomUsers] = useState([])
  const [color, setColor] = useState('white')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const handleColorChange = (event) => {
    setColor(event.target.value)
  }

  function handleFileUpload(event) {
    const file = event.target.files[0]
    if(file) {
      addPanelImage(file)
    }
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target.result)

        
        event.preventDefault()
       
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  function handleCombinedChange(event) {
    handleImageChange(event);
    handleFileUpload(event);
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
  useEffect(() => {
    const storedImage = localStorage.getItem('image')
    if (storedImage) {
      setImage(storedImage)
    }
  }, [])

  return (
    <>
      <div
        className={styles.roomAndUsersColumn}
        style={{
          backgroundColor: color,
          backgroundImage: `url(${image})`,
          backgroundSize: `cover`,
        }}
      >
        <h2 className={styles.roomTitle}>{room}</h2>
        <input type="color" onChange={handleColorChange} />
        <br></br>
        <input type="file" onChange={handleCombinedChange} />
        <div>
          {roomUsers.length > 0 && (
            <h5 className={styles.usersTitle}>Users:</h5>
          )}
          <ul className={styles.usersList}>
            {roomUsers.map((user) => (
              <li
                style={{
                  fontWeight: `${
                    user.username === username ? 'bold' : 'normal'
                  }`,
                }}
                key={user.id}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>

        <br></br>
        <button className="btn btn-outline" onClick={leaveRoom}>
          Leave
        </button>
      </div>
    </>
  )
}

export default RoomAndUsers
