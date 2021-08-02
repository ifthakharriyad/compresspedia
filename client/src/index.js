import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Internationalization
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
//import en from './locales/en/messages'

handleLangChange();
function handleLangChange(lang){
  if(lang){
      window.localStorage.setItem("lang",lang);
      loadLang(lang)
  }else{
    if(window.localStorage.getItem("lang")){
      loadLang(window.localStorage.getItem("lang"))
    }else{
      window.localStorage.setItem("lang","en")
      loadLang("en");
    }
  }
}

function loadLang(lang){ // or whatever you need it to be
  const catalog = require(`./locales/${lang}.js`)
  i18n.load(lang, catalog.messages)
  i18n.activate(lang)
}

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider i18n={i18n}>
      <App onLangChange={handleLangChange}/>
    </I18nProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
