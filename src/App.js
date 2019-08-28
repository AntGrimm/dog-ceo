import React, { Component } from 'react'
import DogPage from './components/DogPage'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <DogPage />
      </>
    )
  }
}

export default App
