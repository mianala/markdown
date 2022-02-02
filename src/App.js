import ReactMarkdown from "react-markdown"
import NotFound from "./pages/NotFound"
import React, { useState, useEffect } from "react"
import home from "./pages/home.md"
import contact from "./pages/contact.md"
import readme from "./pages/readme.md"
import "./github-markdown.css"

function App() {
  const [page, setPage] = useState("")
  const [source, setSource] = useState("# hi there")

  const loading = () => {
    setSource("# loading...")
  }

  // fetch page
  useEffect(() => {
    loading()

    let pageName = readme
    switch (page) {
      case "home":
        pageName = home
        break
      case "contact":
        pageName = contact
        break
      default:
        pageName = readme
        break
    }
    fetch(pageName)
      .then((res) => res.text())
      .then((text) => setSource(text))
  }, [page])

  useEffect(() => {
    // current route
    const currentRoute = window.location.href
    const currentPage = currentRoute.split("/")[3]
    setPage(currentPage)
  }, [])

  return (
    <>
      <ReactMarkdown children={source} />
    </>
  )
}

export default App
