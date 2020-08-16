import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://extremecorp100.com/index.php';

const login = async () => {
  const url = `${BASE_URL}/login`;
  const formData = new FormData();

  formData.append('username', 'darrellbacarro');
  formData.append('password', '94kpzDLL');
  formData.append('login', 'Sign In');

  await fetch(url, {
    method: 'POST',
    body: formData,
  });
}

const transfer = async () => {
  const url = `${BASE_URL}/task`;
  const formData = new FormData();

  formData.append('amount', '25.000000');
  formData.append('transfer_to_waller', 'Transfer to Wallet');

  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
  });
}

const submit = async (value: string) => {
  const url = `${BASE_URL}/task`;
  const formData = new FormData();

  formData.append('captcha_code', value);

  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
  });
}

const App = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 25) {
      const doTransfer = async () => {
        setLoading(true);
        setMessage('Transferring...');
        try {
          await transfer();
        } catch (e) {
          setMessage(e.message);
        }
        setLoading(false);
      }
      doTransfer();
      doTransfer();
    }
  }, [count]);

  useEffect(() => {
    const doLogin = async () => {
      setLoading(true);
      setMessage('Logging in...');
      try {
        await login();
        setLoggedIn(true);
      } catch (e) {
        setMessage(e.message);
      }
      setLoading(false);
    };

    doLogin();
  }, []);
  
  return (
    <>
      <div>{ message }</div>
      <div>{ count }</div>
      <img key={count} src={`${BASE_URL}/task/mcaptcha`} alt="captcha" />
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={async (e)=> {
        if (e.which === 13) {
          setLoading(true);
          setMessage('Submitting...');
          try {
            await submit(value);
            setCount(count => count + 1);
          } catch (e) {
            setMessage(e.message);  
          }
          setValue('');
          setLoading(false);
        }
      }} />
    </>
  );
};

export default App;