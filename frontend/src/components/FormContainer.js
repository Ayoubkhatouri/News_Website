import React from 'react'
import { Row,Col,Container } from 'react-bootstrap'

const FormContainer = ({children}) => {
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={8} sm={8}>
                {children} {/*all the forms iside formcontainer are the children*/}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer