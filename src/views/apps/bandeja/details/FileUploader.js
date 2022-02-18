import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import { X } from 'react-feather'
import { sweetAlertError } from '../../../../@core/components/sweetAlert'

const FileUploader = function({previewArr, setPreviewArr, previewUpload, setPreviewUpload}) {

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
  })

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
    <div>
      <div className="d-flex flex-wrap">
        {previewUpload[0] &&
          previewUpload.map((src, index) => {
            if(src?.data.includes('video')){
              return (
                <div key={index} className="mb-1 mr-1">
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
                <div key={index} className="mb-1 mr-1">
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
      <DragDrop
        uppy={uppy}
      />
    </div>
  )
}

export default FileUploader
