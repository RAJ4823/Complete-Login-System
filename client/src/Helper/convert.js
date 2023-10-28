import { compressAccurately } from 'image-conversion'

export default function convertToBase64(file) {
  return new Promise(async (resolve, reject) => {
    try {
      const cfile = await compressAccurately(file, 70)
      const fileReader = new FileReader()

      fileReader.readAsDataURL(cfile)

      fileReader.onloadend = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  })
}
