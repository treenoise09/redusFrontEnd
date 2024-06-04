
export interface FormValues {
  key: React.Key;
  title: string;
  firstname: string;
  lastname: string;
  birthday: Date | null;  // Changed to string
  nationality: string;
  citizenID: string;
  gender: string;
  mobilePhone: string;
  passportNo: string;
  expectedSalary: number | null;
}
