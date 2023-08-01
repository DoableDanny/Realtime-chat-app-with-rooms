import connection from './connection.js'


export async function getMsgs(db = connection) {
  return await db('msg').select('*')
}

export async function getMsgsByUsername(
  username,
  db = connection
) {
  const [userMsgs] = await db('msgs')
    .where({ username: username })
    .returning('msg')

  return userMsgs
}
