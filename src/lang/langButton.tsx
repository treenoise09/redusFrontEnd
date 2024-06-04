import React from "react";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from '@ant-design/icons';

function Lang() {
    const { i18n } = useTranslation();

    const changeLanguage = ({ key }: { key: string }) => {
        i18n.changeLanguage(key);
    };

    const menu = (
        <Menu onClick={changeLanguage}>
            <Menu.Item key="en">
                {i18n.language === 'en' ? 'EN' : 'อังกฤษ'}
            </Menu.Item>
            <Menu.Item key="th">
                {i18n.language === 'th' ? 'ไทย' : 'TH'}
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="lang-switcher">
            <Dropdown overlay={menu}>
                <Button>
                    {i18n.language === 'en' ? 'EN' : 'ไทย'} <DownOutlined />
                </Button>
            </Dropdown>
        </div>
    );
}

export default Lang;
