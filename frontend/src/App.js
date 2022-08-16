import './App.css';
import React, { useState,useEffect } from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import axios from "axios"
import stubs from './defaultStubs';
import moment from "moment"
import Ide from './component/Ide';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Ide/>} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
