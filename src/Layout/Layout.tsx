import React from "react";
import './Layout.css';
import { Button } from "antd";
import { useNavigate,useParams  } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Layout() {
    const { t,i18n  } = useTranslation();
    const { lang } = useParams();

    const navigate = useNavigate();

    React.useEffect(() => {
      if (lang) {
        i18n.changeLanguage(lang);
      }
    }, [lang, i18n]);
    return (
        <>
            <h1>Layout & Style</h1>
            <Button onClick={() => navigate(`/${lang}`)}>Home</Button>
            <div className="pos">
            <Button className="button button-left" />
            <Button className="button button-up-down" />
            <Button className="button button-right" />
            </div>
            <div className="flex">
            <Button className="button sphere-button" />
            <Button className="button square-button" />
            <Button className="button ellipse-button" />
            </div>
            <div className="flex">
                <Button className="button rectangle-button"></Button>
                <Button className="button trapezoid-button"></Button>
                <Button className="button parallelogram-button"></Button>
            </div>
        </>
    );
}

export default Layout;
