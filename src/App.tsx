import React, { Component } from 'react';
import Header from './containers/Header';
import Footer from './components/Footer';
import './App.scss';
import Indicator from './containers/Indicator';

function App(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Indicator />
      {props.children}
      <Footer />
    </div>
  );
}

export default App;
