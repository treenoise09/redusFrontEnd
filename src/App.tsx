import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import './App.css';
import Card from 'antd/es/card/Card';
import { useTranslation } from 'react-i18next';
import Lang from './lang/langButton';
import Layout from './Layout/Layout';
import CustomForm from './Form/Form';
function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  let { lang } = useParams();

  React.useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div className="App">
      <Card className='container' onClick={() => navigate(`/${lang}/page1`)}>
        <p>{t('test')} 1</p>
        <p>{t('Layout')}</p>
      </Card>
      <Card className='container' onClick={() => navigate(`/${lang}`)}>
        <p>{t('test')} 2</p>
        <p>{t('API')}</p>
      </Card>
      <Card className='container' onClick={() => navigate(`/${lang}/page3`)}>
        <p>{t('test')} 3</p>
        <p>{t('Form')}</p>
      </Card>
    </div>
  );
}

function App() {
  
  return (
    <Router>
      <div>
        <Lang/>
        <Routes>
        <Route path="/" element={<Navigate to="/en" />} />
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/page1" element={<Layout />} />
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/page3" element={<CustomForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
