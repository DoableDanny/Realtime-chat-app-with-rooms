
import connection from './knexConnection.ts'

export async function getUsers(db = connection) {
  return await db('users').select('*')
}

export async function getParticipantByUsername(
  username,
  db = connection
){
  const [user] = await db('users').where({ username: username }).returning('*')
  return user
}

export async function addUser(newUser, db = connection) {
  const { username, bio, image } = newUser
  await db('users').where('username', username).update({
    username,
    bio,
    image,
  })
  return newUser
}
