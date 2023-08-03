const imgUrl = 'http//:localhost/3000/api/v1/users/upload'



export default async function addPanelImage(file: any) {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch(imgUrl, {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      console.log('img uploaded')
    }else {
      console.log('upload failed')
    }
    
  } catch (error) {
    console.error('error uploading image', error)
  }
}
