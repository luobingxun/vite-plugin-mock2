export default [
  {
    url: '/home',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        data: 'home',
        message: null
      };
    }
  }
];
