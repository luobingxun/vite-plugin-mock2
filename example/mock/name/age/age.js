export default [
  {
    url: '/age',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        data: 'age',
        message: null
      };
    }
  }
];
