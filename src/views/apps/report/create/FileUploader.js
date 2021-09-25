import { useState } from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { Card, CardHeader, Label, CardBody } from 'reactstrap'

const FileUploader = () => {
  const [img, setImg] = useState(null)

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true,
  })

  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    setImg(preview)
  })

  return (
    <div className="mb-2">
      <Label>Cargar Prueba</Label>
      <DragDrop
        uppy={uppy}
        // note= 'asd'
      />

      {img !== null ? (
        <img className="rounded mt-2" src={img} alt="avatar" />
      ) : null}
    </div>
  )
}

export default FileUploader
