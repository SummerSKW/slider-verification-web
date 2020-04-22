import React from 'react';
import ReactDOM from 'react-dom';
import SliderVerification from './sliderVerification';

const handleChecked = () => {
  console.log('checked');
};

ReactDOM.render(
  <div style={{ width: 360, margin: 'atuo' }}>
    <SliderVerification onChecked={handleChecked} mode="static" />
  </div>,
  document.getElementById('app')
);
