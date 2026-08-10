export const generateUser = () => {
  const timestamp = Date.now();
  return {
    name: `User${timestamp}`,
    email: `user${timestamp}@example.by`,
    password: 'password',
    title: 'Mr',
    birth_date: '15',
    birth_month: 'May',
    birth_year: '1990',
    first_name: 'Test',
    last_name: 'User',
    company: 'TestCorp',
    address1: 'Main st',
    address2: '',
    country: 'United States',
    zipcode: '12345',
    state: 'State',
    city: 'City',
    mobile_number: '1234567890',
  };
};
