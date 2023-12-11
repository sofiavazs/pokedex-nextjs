const mockAxios = jest.genMockFromModule('axios');

mockAxios.get = jest.fn(() => Promise.resolve({ data: [{ id: 1, name: 'John' }] }));

export default mockAxios;