import React, { Component } from 'react';
import Header from './containers/Header';
import Footer from './components/Footer';
import './App.scss';

function App(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="container such-a-big-device">{props.children}</div>
      <Footer />
    </div>
  );
}

export default App;
