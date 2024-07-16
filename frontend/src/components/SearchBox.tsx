import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const SearchBox = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const urlKeyword = searchParams.get("search") || ""
  const [keyword, setKeyword] = useState(urlKeyword)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setKeyword("")
    if (keyword) {
      navigate(`/?search=${keyword.trim()}`)
    } else {
      navigate("/")
    }
  }

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
