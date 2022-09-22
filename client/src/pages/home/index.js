import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });

      navigate('/chat', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`Login`}</h1>
        <input
          className={styles.input}
          placeholder='Enter your username'
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value='centurion'>Centurion</option>
          <option value='orion'>Orion</option>
          <option value='deutron'>Deuteron</option>
          <option value='galacticon'>Galacticon</option>
        </select>

        <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
