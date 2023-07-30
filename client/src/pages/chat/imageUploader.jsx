import { useState } from 'react'

const ImageUploader = () => {
  const [image, setImage] = useState(null)

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target.result)
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }
  return (
    <>
      <input type="file" onchange={handleImageChange} />
      {image && (
        <div
          style={{
            width: '100mw',
            height: '100mh',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
          }}
        />
      )}
    </>
  )
}

export default ImageUploader
