import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import { useEffect, useState } from "react"
import axios from "axios"
import { ProductType } from "../helpers/types"

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<ProductType[]>("/api/products")
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} className="my-3" key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
