// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "test": "Test",
      "Layout": "Layout & style",
      "API": "Connect API",
      "Form": "Form & Table",
      "Title": "Title",
      "Firstname": "Firstname",
      "Lastname": "Lastname",
      "Birthday": "Birthday",
      "Nationality": "Nationality",
      "CitizenID": "Citizen ID",
      "Gender": "Gender",
      "Male": "Male",
      "Female": "Female",
      "male": "Male",
      "female": "Female",
      "Other": "Other",
      "MobilePhone": "Mobile Phone",
      "PassportNo": "Passport No",
      "ExpectedSalary": "Expected Salary",
      "Reset": "Reset",
      "Submit": "Submit",
      "SelectTitle": "Select a title",
      "SelectNationality": "Select your nationality",
      "Name" : "Name"
    }
  },
  th: {
    translation: {
      "test": "แบบทดสอบที่",
      "Layout": "การจัดการหน้าเว็บ",
      "API": "การเชื่อมต่อ API",
      "Form": "การจัดการฟอร์ม",
      "Title": "คำนำหน้า",
      "Firstname": "ชื่อ",
      "Lastname": "นามสกุล",
      "Birthday": "วันเกิด",
      "Nationality": "สัญชาติ",
      "CitizenID": "เลขบัตรประชาชน",
      "Gender": "เพศ",
      "Male": "ชาย",
      "Female": "หญิง",
      "male": "ชาย",
      "female": "หญิง",
      "Other": "อื่นๆ",
      "MobilePhone": "เบอร์โทรศัพท์",
      "PassportNo": "เลขที่หนังสือเดินทาง",
      "ExpectedSalary": "เงินเดือนที่คาดหวัง",
      "Reset": "รีเซ็ต",
      "Submit": "ส่ง",
      "SelectTitle": "เลือกคำนำหน้า",
      "SelectNationality": "เลือกสัญชาติ",
      "Name" : "ชื่อ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "th", // Default language
    interpolation: {
      escapeValue: false // React already escapes from XSS
    }
  });

export default i18n;
