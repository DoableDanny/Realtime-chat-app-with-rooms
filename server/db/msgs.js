import connection from './knexConnection.js'


export async function getMsgs(db = connection) {
  try{
    const messages = await connection('msg').where('*').returning('*')
    return messages
  }catch (error) {
  throw new Error('Error fetching messages: ' + error.message);
}}


export async function getMsgsByUsername(
  username,
  db = connection
) {
  const [userMsgs] = await connection('msgs')
    .where({ username: username })
    .returning('msg')

  return userMsgs
}
