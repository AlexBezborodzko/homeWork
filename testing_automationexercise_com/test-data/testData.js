export const generateUser = async () => {
    const timestamp = Date.now();
    return {
        name: `User${timestamp}`,
        email: `user${timestamp}@example.by`,
        password: 'password',
        firstName: 'test',
        lastName: 'test',
        address: 'Main st',
        state: 'state',
        city: 'city',
        zipCode: 'zipCode',
        mobile: '1234567890',
    };

};
