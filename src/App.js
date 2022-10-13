import './App.css';
import React from 'react'
import Banner from './Components/Banner/Banner';
import NavBar from './Components/NavBar/NavBar.js';
import RowPosts from './Components/RowPosts/RowPosts';
import { actions, horror, romance } from './urls'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      {/* <RowPosts url={originals} title='Netflix Originals'/> */}
      <RowPosts url={actions} title='Action'/>
      <RowPosts url={horror} title='Horror' isSmall/>
      <RowPosts url={romance} title='Romance' isSmall/>
      {/* <RowPosts url={documentaries} title='Documentaries' isSmall/> */}
    </div>
  );
}

export default App;
