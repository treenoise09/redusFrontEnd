import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormValues } from "../../types";

interface FormState {
  formData: FormValues;
  dataSource: FormValues[];
  selectedRowKeys: React.Key[];
}

const initialFormValues: FormValues = {
    key: "",
  title: "",
  firstname: "",
  lastname: "",
  birthday: null, // Change the type to Date object or null
  nationality: "",
  citizenID: "",
  gender: "",
  mobilePhone: "",
  passportNo: "",
  expectedSalary: null,
};

const initialState: FormState = {
  formData: initialFormValues,
  dataSource: [], // Initialize dataSource as an empty array
  selectedRowKeys:[]
};

function isDataEqual(data1: FormValues, data2: FormValues): boolean {
    // Compare each property of the FormValues objects
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

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormValues>) => {
      state.formData = action.payload;
      localStorage.setItem("formData", JSON.stringify(state.formData));
    },
    addToDataSource: (state, action: PayloadAction<FormValues[]>) => {
        action.payload.forEach((newItem, index) => {
          // Ensuring unique key generation using a combination of time and random numbers
          newItem.key = `${new Date().getTime()}-${Math.random() * 1000}-${index}`;
      
          // Check if the item already exists based on your isDataEqual function
          if (!state.dataSource.some(existingItem => isDataEqual(existingItem, newItem))) {
            state.dataSource.push(newItem);
          }
        });
      
        // Save the updated dataSource to localStorage
        localStorage.setItem("dataSource", JSON.stringify(state.dataSource));
      },
      
      setSelectedRowKeys: (state, action: PayloadAction<React.Key[]>) => {
        state.selectedRowKeys = action.payload;
    },
    
    clearFormData: (state) => {
      state.formData = initialFormValues;
      localStorage.removeItem("formData");
    },
    clearDataSource: (state) => {
      state.dataSource = [];
      localStorage.removeItem("dataSource");
    },
    EditData: (state, action: PayloadAction<{ index: number, newData: FormValues }>) => {
        const { index, newData } = action.payload;
  
        // Convert birthday back to a Date object without time
        if (newData.birthday) {
          const birthday = new Date(newData.birthday);
          newData.birthday = new Date(birthday.toISOString().split('T')[0]);
        }
  
        state.dataSource[index] = newData;
        localStorage.setItem("dataSource", JSON.stringify(state.dataSource));
      },
    deleteData: (state, action: PayloadAction<React.Key[]>) => {
        state.dataSource = state.dataSource.filter(item =>
          !action.payload.includes(item.key)
        );
        // Also clear selectedRowKeys that are deleted
        state.selectedRowKeys = state.selectedRowKeys.filter(key =>
          !action.payload.includes(key)
        );
      },
      
  },
});

export const { setFormData, addToDataSource, clearFormData, clearDataSource, EditData, deleteData, setSelectedRowKeys  } = formSlice.actions;
export default formSlice.reducer;
