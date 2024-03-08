function App() {
  return (
    <>
      <button onClick={() => fetch('/home')}>发起home请求</button>
      <button onClick={() => fetch('/about')}>发起about请求</button>
      <button onClick={() => fetch('/name')}>发起name请求</button>
      <button onClick={() => fetch('/age')}>发起age请求</button>
    </>
  );
}

export default App;
