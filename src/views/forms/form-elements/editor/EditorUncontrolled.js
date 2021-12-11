import { Editor } from 'react-draft-wysiwyg'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const EditorUncontrolled = function() {
  return <Card>
    <CardHeader>
      <CardTitle tag="h4">Uncontrolled Editor</CardTitle>
    </CardHeader>
    <CardBody>
      <Editor />
    </CardBody>
  </Card>
}

export default EditorUncontrolled
