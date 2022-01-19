import { useState } from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { Card, CardHeader, Label, CardBody } from 'reactstrap'

const FileUploader = function() {
  const [img, setImg] = useState([])
  // console.log('img', img)

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true,
  })

  // console.log(uppy)

  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    // console.log(file)
    setImg([...img, preview])
  })

  return (
    <div className="mb-2">
      <Label>Cargar pruebas</Label>
      <DragDrop
        uppy={uppy}
        // note= 'asd'
      />

      {img[0] && (
        img.map(img => (
          <img className="rounded mt-2 mr-2" src={img} alt="avatar" /> 
      )))}
    </div>
  )
}

export default FileUploader
