import fs from 'fs'

export const uploadRemover = (filename) => {
    const path = `public/upload/${filename}`
    fs.unlink(path, err => console.log(err))
}