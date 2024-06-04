import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, Radio, InputNumber, Table, Checkbox } from 'antd';
import './Form.css';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import { setFormData, addToDataSource, clearFormData, setSelectedRowKeys, EditData, deleteData } from "../store/slice/formSlice";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { FormValues } from "../types";
import { useNavigate,useParams  } from "react-router-dom";
import App from "../App";
const { Option } = Select;

function isDataEqual(data1: FormValues, data2: FormValues): boolean {
    return (
        data1.title === data2.title &&
        data1.firstname === data2.firstname &&
        data1.lastname === data2.lastname &&
        data1.birthday === data2.birthday &&
        data1.nationality === data2.nationality &&
        data1.citizenID === data2.citizenID &&
        data1.gender === data2.gender &&
        data1.mobilePhone === data2.mobilePhone &&
        data1.passportNo === data2.passportNo &&
        data1.expectedSalary === data2.expectedSalary
    );
}

function CustomForm() {
    const dispatch = useAppDispatch();
    const { t,i18n  } = useTranslation();
    const formData = useSelector((state: RootState) => state.form.formData);
    const dataSource: FormValues[] = useSelector((state: RootState) => state.form.dataSource);
    const selectedRowKeys = useSelector((state: RootState) => state.form.selectedRowKeys);
    const [form] = useForm();
    const { lang } = useParams();

    const navigate = useNavigate();

    React.useEffect(() => {
      if (lang) {
        i18n.changeLanguage(lang);
      }
    }, [lang, i18n]);

    useEffect(() => {
        const storedFormData = localStorage.getItem("formData");
        if (storedFormData) {
            const parsedFormData: FormValues = JSON.parse(storedFormData);
            dispatch(setFormData(parsedFormData));
        }

        const storedDataSource = localStorage.getItem("dataSource");
        if (storedDataSource) {
            const parsedDataSource: FormValues[] = JSON.parse(storedDataSource);
            dispatch(addToDataSource(parsedDataSource));
        }
    }, [dispatch]);

    const handleFormSubmit = (values: FormValues) => {
        const existingIndex = dataSource.findIndex(item => isDataEqual(item, formData));
        if (existingIndex !== -1) {
            dispatch(EditData({ index: existingIndex, newData: values }));
        } else {
            dispatch(addToDataSource([values]));
        }
        dispatch(setFormData(values));
    };

    const handleReset = () => {
        dispatch(clearFormData());
        form.resetFields();
    };

    const handleEdit = (record: FormValues) => {
        const editedRecord = { ...record };
        if (editedRecord.birthday) {
            // Convert the birthday to a Date object without time component
            const birthday = new Date(editedRecord.birthday);
            editedRecord.birthday = new Date(birthday.toISOString().split('T')[0]);
        }
        form.setFieldsValue({
            ...editedRecord,
            birthday: moment(editedRecord.birthday),
        });
    };

    const handleDelete = (record: FormValues) => {
        const keyToDelete = record.key;
        if (keyToDelete !== undefined) {
            dispatch(deleteData([keyToDelete]));
        }
    };

    const handleSelectChange = (selectedRowKeys: React.Key[]) => {
        dispatch(setSelectedRowKeys(selectedRowKeys));
    };

    const handleSelectAll = (event: any) => {
        if (event.target.checked) {
            const allKeys = dataSource.map(item => item.key);
            dispatch(setSelectedRowKeys(allKeys));
        } else {
            dispatch(setSelectedRowKeys([]));
        }
    };

    const isAllSelected = selectedRowKeys.length === dataSource.length && dataSource.length > 0;

    const columns = [
        {
            title: t('Name'),
            render: (_: any, record: FormValues) => `${record.title} ${record.firstname} ${record.lastname}`,
        },
        {
            title: t('Gender'),
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: t('MobilePhone'),
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
        },
        {
            title: t('Nationality'),
            dataIndex: 'nationality',
            key: 'nationality',
        },
        {
            title: t('Manage'),
            render: (_: any, record: FormValues) => (
                <span>
                    <Button onClick={() => handleEdit(record)}>{t('Edit')}</Button>
                    <Button onClick={() => handleDelete(record)}>{t('Delete')}</Button>
                </span>
            ),
        },
    ];
  return (
    <>
      <h1>{t('Form')}</h1>
      <Button onClick={() => navigate(`/${lang}`)}>Home</Button>
      <div className="form_background">

      <Form
  layout="vertical"
  name="custom_form"
  className="custom-form"
  initialValues={{  // Pass initial form values here
    title: "",
    firstname: "",
    lastname: "",
    birthday: "", // Set to undefined or null if you don't have initial value
    nationality: "",
    citizenID: "",
    gender: "",
    mobilePhone: "",
    passportNo: "",
    expectedSalary: null,
  }}
  form={form} // Make sure to pass the form instance to the Form component
  onFinish={handleFormSubmit}
>
    <div className="line-COL">
<div className="formDiv">
                    <Form.Item
                        name="title"
                        label={t('Title')}
                        rules={[{ required: true, message: t('SelectTitle') }]}
                    >
                        <Select placeholder={t('SelectTitle')}>
                            <Option value="mr">Mr</Option>
                            <Option value="mrs">Mrs</Option>
                            <Option value="ms">Ms</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="firstname"
                        label={t('Firstname')}
                        rules={[{ required: true, message: t('Firstname') }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label={t('Lastname')}
                        rules={[{ required: true, message: t('Lastname') }]}
                    >
                        <Input />
                    </Form.Item>
                    </div>
                    </div>
                    <div className="line-COL"> 
                    <div className="formDiv">
                    <Form.Item
                        name="birthday"
                        label={t('Birthday')}
                        rules={[{ required: true, message: t('Birthday') }]}
                    >
                        <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="nationality"
                        label={t('Nationality')}
                        rules={[{ required: true, message: t('SelectNationality') }]}
                    >
                        <Select placeholder={t('SelectNationality')}>
                            <Option value="thai">{t('Nationality')}</Option>
                            <Option value="american">American</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                    </div>
                    </div>


                    <div className="line-COL">
                    <div className="formDiv">
                    <Form.Item
                        name="citizenID"
                        label={t('CitizenID')}
                    >
                        <Input />
                    </Form.Item>
                    </div>
                    </div>
                    <div className="line-COL">
                    <div className="formDiv">
                    <Form.Item
                        name="gender"
                        label={t('Gender')}
                        rules={[{ required: true, message: t('Gender') }]}
                    >
                        <Radio.Group>
                            <Radio value="male">{t('Male')}</Radio>
                            <Radio value="female">{t('Female')}</Radio>
                            <Radio value="other">{t('Other')}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    </div>
                    </div>
                    <div className="line-COL">
                    <div className="formDiv">
                    <Form.Item
                        name="mobilePhone"
                        label={t('MobilePhone')}
                        rules={[{ required: true, message: t('MobilePhone') }]}
                    >
                        <Input />
                    </Form.Item>
                    </div>
                    <div>
                    <Form.Item
                        name="passportNo"
                        label={t('PassportNo')}
                    >
                        <Input />
                    </Form.Item>
                    </div>
                    </div>
                    <div className="line-COL">
                    <div className="formDiv">
                    <Form.Item
                        name="expectedSalary"
                        label={t('ExpectedSalary')}
                        rules={[{ required: true, message: t('ExpectedSalary') }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    
                    <Form.Item className="form-buttons">
                        <Button type="default" onClick={handleReset}>
                            {t('Reset')}
                        </Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>
                            {t('Submit')}
                        </Button>
                    </Form.Item>
                    </div>
                    </div>
                </Form>
            </div>
            <div className="contain">
    <Checkbox
        onChange={handleSelectAll}
        checked={isAllSelected}
        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < dataSource.length}
    >
        Select All
    </Checkbox>
    <Button onClick={() => dispatch(deleteData(selectedRowKeys))}>DELETE</Button>
</div>

            <div >
            <Table
  rowSelection={{
    type: 'checkbox',
    selectedRowKeys,
    onChange: handleSelectChange,
  }}
  dataSource={dataSource.map((item, index) => ({ ...item, key: index.toString() }))}
  columns={columns}
  pagination={{ pageSize: 10 }}
/>

            </div>
        </>
    );
}

export default CustomForm;
