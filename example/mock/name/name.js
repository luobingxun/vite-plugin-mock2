export default [
  {
    url: '/name',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        data: 'name',
        message: null
      };
    }
  }
];
