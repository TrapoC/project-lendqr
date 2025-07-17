import { User } from '../types/user';

const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Paystack', 'Flutterwave', 'Kuda', 'Opay', 'PiggyVest'];
const statuses: User['status'][] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const genders: User['gender'][] = ['Male', 'Female'];
const maritalStatuses: User['maritalStatus'][] = ['Single', 'Married', 'Divorced', 'Widowed'];
const educationLevels = ['B.Sc', 'M.Sc', 'Ph.D', 'HND', 'OND', 'SSCE'];
const employmentStatuses = ['Employed', 'Unemployed', 'Self-employed'];
const sectors = ['FinTech', 'Banking', 'Technology', 'Healthcare', 'Education', 'Retail', 'Manufacturing'];
const residenceTypes = ['Parent\'s Apartment', 'Rented Apartment', 'Own House', 'Company Quarters'];
const relationships = ['Sister', 'Brother', 'Friend', 'Colleague', 'Parent', 'Spouse'];
const banks = ['Providus Bank', 'GTBank', 'Access Bank', 'First Bank', 'UBA', 'Zenith Bank', 'Fidelity Bank'];

const firstNames = [
  'Grace', 'John', 'Mary', 'David', 'Sarah', 'Michael', 'Jennifer', 'Robert', 'Lisa', 'William',
  'Karen', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Nancy', 'Christopher', 'Betty', 'Daniel',
  'Helen', 'Matthew', 'Sandra', 'Anthony', 'Donna', 'Mark', 'Carol', 'Donald', 'Ruth', 'Steven',
  'Sharon', 'Paul', 'Michelle', 'Andrew', 'Laura', 'Joshua', 'Sarah', 'Kenneth', 'Kimberly', 'Kevin',
  'Deborah', 'Brian', 'Dorothy', 'George', 'Lisa', 'Edward', 'Nancy', 'Ronald', 'Karen', 'Timothy',
  'Betty', 'Jason', 'Helen', 'Jeffrey', 'Sandra', 'Ryan', 'Donna', 'Jacob', 'Carol', 'Gary',
  'Ruth', 'Nicholas', 'Sharon', 'Eric', 'Michelle', 'Jonathan', 'Laura', 'Stephen', 'Sarah', 'Larry',
  'Kimberly', 'Justin', 'Deborah', 'Scott', 'Dorothy', 'Brandon', 'Lisa', 'Benjamin', 'Nancy', 'Samuel',
  'Karen', 'Gregory', 'Betty', 'Alexander', 'Helen', 'Patrick', 'Sandra', 'Frank', 'Donna', 'Raymond',
  'Carol', 'Jack', 'Ruth', 'Dennis', 'Sharon', 'Jerry', 'Michelle', 'Tyler', 'Laura', 'Aaron'
];

const lastNames = [
  'Effiom', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
  'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson',
  'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis',
  'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill',
  'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter',
  'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins',
  'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan',
  'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward',
  'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz',
  'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster'
];

const generateRandomUser = (id: number): User => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${organizations[Math.floor(Math.random() * organizations.length)].toLowerCase()}.com`;
  
  return {
    id: `LSQ${String(id).padStart(8, '0')}`,
    firstName,
    lastName,
    email,
    phoneNumber: `0${Math.floor(Math.random() * 900000000) + 700000000}`,
    dateJoined: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    organization: organizations[Math.floor(Math.random() * organizations.length)],
    username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}`,
    bvn: String(Math.floor(Math.random() * 90000000000) + 10000000000),
    gender: genders[Math.floor(Math.random() * genders.length)],
    maritalStatus: maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
    children: Math.floor(Math.random() * 5).toString(),
    typeOfResidence: residenceTypes[Math.floor(Math.random() * residenceTypes.length)],
    levelOfEducation: educationLevels[Math.floor(Math.random() * educationLevels.length)],
    employmentStatus: employmentStatuses[Math.floor(Math.random() * employmentStatuses.length)],
    sectorOfEmployment: sectors[Math.floor(Math.random() * sectors.length)],
    durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
    officeEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
    monthlyIncome: `₦${(Math.floor(Math.random() * 500000) + 50000).toLocaleString()}.00`,
    loanRepayment: `₦${(Math.floor(Math.random() * 100000) + 10000).toLocaleString()}`,
    twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    facebook: `${firstName} ${lastName}`,
    instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    guarantor: {
      fullName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      phoneNumber: `0${Math.floor(Math.random() * 900000000) + 700000000}`,
      email: `guarantor${Math.floor(Math.random() * 1000)}@email.com`,
      relationship: relationships[Math.floor(Math.random() * relationships.length)]
    },
    accountBalance: Math.floor(Math.random() * 1000000) + 10000,
    accountNumber: String(Math.floor(Math.random() * 9000000000) + 1000000000),
    bankName: banks[Math.floor(Math.random() * banks.length)],
    tier: Math.floor(Math.random() * 3) + 1
  };
};

export const mockUsers: User[] = Array.from({ length: 500 }, (_, i) => generateRandomUser(i + 1));