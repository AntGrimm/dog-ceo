import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DogPage = () => {
  const [displayDogs, setDisplayDogs] = useState([])
  const [allDogs, setAllDogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('hound')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const PER_PAGE = 10
  const offset = currentPage * PER_PAGE

  const fetchData = async () => {
    const resp = await axios.get(
      `https://dog.ceo/api/breed/${searchTerm}/images`
    )
    console.log(resp.data)
    // setDisplayDogs(resp.data.message.slice(0, PER_PAGE))
    setAllDogs(resp.data.message)
    const total =
      resp.data.message.length % PER_PAGE === 0
        ? resp.data.message.length / PER_PAGE
        : Math.floor(resp.data.message.length / PER_PAGE) + 1
    setTotalPages(total)
  }

  const showNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const showPrevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  // useEffect(() => {
  //   console.log('current page is updated')
  //   setDisplayDogs(allDogs.slice(offset, offset + PER_PAGE))
  // }, [currentPage])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <main>
        <section>
          <input
            type="search"
            className="search-box"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={fetchData}>
            <i className="fas fa-search fa-flip-horizontal "></i>SEARCH
          </button>
        </section>
        <nav>
          <button onClick={showPrevPage}>PREV</button>
          <section>
            {currentPage} of {totalPages}
          </section>
          <button onClick={showNextPage}>NEXT</button>
        </nav>
        <section>
          <ul>
            {allDogs.slice(offset, offset + PER_PAGE).map((dogImage, i) => {
              return (
                <li key={i}>
                  <img src={dogImage} />
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      {/* <script src="https://kit.fontawesome.com/e10cfbf85b.js"></script> */}
    </>
  )
}

export default DogPage
