let axios = require('axios')

function harperSaveMessage(message, username, room) {
  const dbUrl = process.env.HARPERDB_URL
  const dbPw = process.env.HARPERDB_PW
  if (!dbUrl || !dbPw) return null

  let data = JSON.stringify({
    operation: 'insert',
    schema: 'sparkles',
    table: 'messages',
    records: [
      {
        message,
        username,
        room,
      },
    ],
  })

  let config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dbPw,
    },
    data: data,
  }

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data))
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export default harperSaveMessage
