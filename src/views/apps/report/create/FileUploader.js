import Uppy from '@uppy/core'
// import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { X } from 'react-feather'
import { useState } from 'react'
import { Label } from 'reactstrap'
import { sweetAlertError } from '../../../../@core/components/sweetAlert'
import { RequiredInput } from '../../../../@core/components/requiredInput'

const FileUploader = function({previewArr, setPreviewArr}) {

  const [ previewUpload, setPreviewUpload ] = useState([])

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
    const reader = new FileReader()
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

  const handleDeleteAttachments = (id) => {
    setPreviewArr(
      previewArr.filter(preview => preview !== previewArr[id])
    )
    setPreviewUpload(
      previewUpload.filter(preview => preview !== previewUpload[id])
    )
  }

  const renderDeleteAttachments = (id) => (
    <div className="d-flex flex-row-reverse">
      <div style={{marginBottom: '-10px', marginRight: '-5px', zIndex: '1'}}>
        <span onClick={() => handleDeleteAttachments(id)} style={{cursor: 'pointer', background: 'red', borderRadius: '50%', padding: '2px'}}>
          <X size={16} color="white" />
        </span>
      </div>
    </div>
  )

  return (
    <div className="mb-2">
      <Label>Cargar pruebas<RequiredInput /></Label>
      <DragDrop
        uppy={uppy}
        // note={previewArr[0] && `${previewArr.length} Adjunto${previewArr.length > 1 ? 's' : ''}`}
      />
        <div className="d-flex flex-wrap">
          {previewUpload[0] &&
            previewUpload.map((src, index) => {
              if(src?.data.includes('video')){
                return (
                  <div key={index} className="mt-2 mr-1">
                    {renderDeleteAttachments(index)}
                    <video 
                      key={index} 
                      className="rounded"
                      width="200"
                      controls
                    >
                      <source src={src.data} type="video/mp4"/>
                    </video>
                  </div>
                )
              }
                return (
                  <div key={index} className="mt-2 mr-1">
                    {renderDeleteAttachments(index)}
                    <img 
                      key={index} 
                      style={{width: '200px'}}
                      className="rounded" 
                      src={src.data} 
                      alt="Adjunto de prueba" 
                    />
                  </div>
                ) 
            })
          }
        </div>
    </div>
  )
}

export default FileUploader
