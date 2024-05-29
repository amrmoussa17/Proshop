import { Row, Col, Container } from "react-bootstrap"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Proshop &copy; {year}</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
