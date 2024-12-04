import React from "react";
import Head from './components/Head';
import Home from './components/Home';

function App() {
  return (
    <>
      <Head 
        title="Home - Pen & Paper"
        description="Welcome to Pen & Paper, your go-to shop for stationery!"
      />
      <Home/>


    </>
  );
}

export default App;