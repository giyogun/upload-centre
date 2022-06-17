import React, { useState } from "react";
import Upload from "./components/Upload";

import {Toaster} from 'react-hot-toast'

function App() {
 
  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>Upload Center</h1>
      <Toaster position="bottom-left" />
      <Upload />
    </div>
  );
}

export default App;
