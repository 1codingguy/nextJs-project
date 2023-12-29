'use client'

import { useState } from 'react'
import { API_URL } from '@config/index'
import styles from '../events/add/Form.module.css'

type ImageUploadProps = {
  evtId: string
  imageUploaded: () => void
}

const ImageUpload = ({ evtId, imageUploaded }: ImageUploadProps) => {
  const [image, setImage] = useState<File | undefined>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (image) {
      const formData = new FormData()
      formData.append('files', image)
      formData.append('ref', 'api::event.event') // diff to tutorial in Strapi V3
      formData.append('refId', evtId)
      formData.append('field', 'image')

      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        imageUploaded()
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={e => handleFileChange(e)} />
        </div>

        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  )
}

export default ImageUpload
