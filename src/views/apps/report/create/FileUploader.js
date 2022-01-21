import Uppy from '@uppy/core'
// import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { useState } from 'react'
import { Label } from 'reactstrap'
import { sweetAlertError } from '../../../../@core/components/sweetAlert'

const FileUploader = ({previewArr, setPreviewArr}) => {

  const [ previewUpload, setPreviewUpload ] = useState([])
  console.log('img', previewArr)

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
  })

  // uppy.use(thumbnailGenerator)

  // uppy.on('thumbnail:generated', (file, preview) => {
  //   console.log(file);
  //   const arr = previewArr
  //   arr.push(preview)
  //   setPreviewArr([...arr])
  // })

  uppy.on("file-added", (file) => {
    let reader = new FileReader()
    reader.readAsDataURL(file.data)
    reader.onloadend = () => {
      const arr = previewArr
      const previewArray = previewUpload
      if(file.type.includes('video')){
        arr.push({
          filename: file.name,
          data: reader.result.split(',')[1],
          "mime-type": file.type,
        })
        previewArray.push({data: reader.result})
      }else {
        arr.push({
          filename: file.name,
          data: reader.result.split(',')[1],
          // data: reader.result.replace(/^data:image\/[a-z]+;base64,/, ""),
          "mime-type": file.type,
        })
        previewArray.push({data: reader.result})
      }
      setPreviewArr([...arr])
      setPreviewUpload([...previewArray])
    }
    reader.onerror = () => {
      sweetAlertError()
    }
  })

  return (
    <div className="mb-2">
      <Label>Cargar pruebas</Label>
      <DragDrop
        uppy={uppy}
        // note={previewArr[0] && `${previewArr.length} Adjunto${previewArr.length > 1 ? 's' : ''}`}
      />
        <div className="d-inline-flex">
          {previewUpload[0] &&
            previewUpload.map((src, index) => {
              if(src?.data.includes('video')){
                return (
                  <video 
                    key={index} 
                    className="rounded mt-2 mr-1"
                    width="200"
                    controls
                  >
                    <source src={src.data} type="video/mp4"/>
                  </video>
                )
              }else{
                return (
                  <img 
                    key={index} 
                    style={{width: '200px'}}
                    className="rounded mt-2 mr-1" 
                    src={src.data} 
                    alt="Adjunto de prueba" 
                  />
                ) 
              }
            })
          }
        </div>
    </div>
  )
}

export default FileUploader
