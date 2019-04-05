import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="container">{props.children}</div>
      <Footer />
    </div>
  );
}

export default App;
