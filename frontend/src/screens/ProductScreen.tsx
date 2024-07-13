import { Link, useNavigate, useParams } from "react-router-dom"
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap"
import Rating from "../components/Rating"
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productsApiSlice"
import { useState } from "react"
import { addToCart } from "../slices/cartSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { toast } from "react-toastify"
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../helpers/RTKQueryError"

const ProductScreen = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { userInfo } = useAppSelector((state) => state.auth)

  const [qty, setQty] = useState(1)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState("")

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product!, qty }))
    navigate("/cart")
  }
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId)

  const [createReview, { isLoading: loadingCreateReview }] =
    useCreateReviewMutation()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap()
      toast.success("Review created successfully")
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = "error" in err ? err.error : JSON.stringify(err.data)
        toast.error(errMsg)
      } else if (isErrorWithMessage(err)) {
        toast.error(err.message)
      }
    }
  }
  if (isLoading) {
    return <Spinner animation="border" />
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
    return <div>{error.message}</div>
  }
  if (product) {
    return (
      <>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating!}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="review">
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews!.length === 0 && (
              <Alert variant="info">No Reviews</Alert>
            )}
            <ListGroup variant="flush">
              {product.reviews!.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} text={""} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>write a customer review</h2>
                {loadingCreateReview && <Spinner />}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingCreateReview}
                      type="submit"
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <p>
                    <Link to="/login">sign in</Link> to write a review
                  </p>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
    )
  }
  return null
}

export default ProductScreen
