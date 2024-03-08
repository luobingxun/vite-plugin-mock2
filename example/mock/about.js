export default [
  {
    url: '/about',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        data: 'about',
        message: null
      };
    }
  }
];
