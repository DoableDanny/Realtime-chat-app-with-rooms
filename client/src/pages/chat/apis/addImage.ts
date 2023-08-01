import axios from 'axios'

const imgUrl = 'http://localhost:4000'

interface PanelImage {
  url: string
}

export async function addPanelImage(panelImage: PanelImage) {
  try {
    const response = await axios.post(imgUrl, panelImage)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
