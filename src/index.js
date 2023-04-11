import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootApp from "./RootApp";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootApp/>
  </React.StrictMode>
);

