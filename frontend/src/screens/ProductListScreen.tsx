import { Alert, Button, Col, Row, Spinner, Table } from "react-bootstrap"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import { toast } from "react-toastify"
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../helpers/RTKQueryError"
import { ProductType } from "../helpers/types"
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../slices/productsApiSlice"

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()

  const [createProduct] = useCreateProductMutation()

  const deleteHandler = () => {}
  console.log("delete product")
  if (isLoading) {
    return <Spinner />
  }

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct()
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = "error" in err ? err.error : JSON.stringify(err.data)
          toast.error(errMsg)
        } else if (isErrorWithMessage(err)) {
          toast.error(err.message)
        }
      }
    }
  }

  if (error) {
    if ("status" in error) {
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data)
      return (
        <Alert variant="danger">
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </Alert>
      )
    }
    return <Alert variant="danger">{error.message}</Alert>
  }

  if (products) {
    return (
      <>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className="text-end">
            <Button className="btn-sm" onClick={createProductHandler}>
              <FaPlus /> create product
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductType) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>${product.category}</td>
                <td>${product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={deleteHandler}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  }
  return null
}

export default ProductListScreen
