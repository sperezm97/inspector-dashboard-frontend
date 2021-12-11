// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

const VerticalLayout = function(props) {
  return <Layout {...props}>{props.children}</Layout>
}

export default VerticalLayout
