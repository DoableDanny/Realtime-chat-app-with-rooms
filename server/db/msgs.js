import connection from './knexConnection.ts'


/*export async function getMsgs(username, db = connection) {
  try{
    const messages = await connection('msg').where('*').returning('*')
    return messages
  }catch (error) {
  throw new Error('Error fetching messages: ' + error.message);
}}*/


export async function getMsgs(
  username,
  db = connection
) {
  const [userMsgs] = await connection('msgs')
    .where({ username: username })
    .returning('msg')

  return userMsgs
}
