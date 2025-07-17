export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  organization: string;
  username: string;
  bvn: string;
  gender: 'Male' | 'Female';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
  accountBalance: number;
  accountNumber: string;
  bankName: string;
  tier: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}