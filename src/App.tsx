import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App(props: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />
    </React.Fragment>
  );
}

export default App;
