import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom' // Add this

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate() // Add this

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room })
    }

    // Redirect to /chat
    navigate('/chat', { replace: true })
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`🥰 SparklezChatz 🐈`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value="MeowLand">MeowLand</option>
          <option value="Public">Public</option>
          <option value="Npm Runners">Npm Runners</option>
          <option value="Barbie">Barbie</option>
        </select>

        <button
          className="btn btn-secondary"
          style={{ width: '100%' }}
          onClick={joinRoom}
        >
          Join Sparklez Land
        </button>
      </div>
    </div>
  )
}

export default Home
