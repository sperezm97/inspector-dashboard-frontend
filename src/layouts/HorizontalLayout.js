// !Do not remove the Layout import
import Layout from '@layouts/HorizontalLayout'

const HorizontalLayout = function(props) {
  return <Layout {...props}>{props.children}</Layout>
}

export default HorizontalLayout
