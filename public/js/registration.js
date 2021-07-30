const form = document.querySelector('form');
const warning = document.querySelector('.warning');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // get values
  const fname = form.fname.value;
  const lname = form.lname.value;
  const email = form.email.value;
  const mobile = form.mobile.value;
  const password = form.password.value;
  const c_password = form.c_password.value;

  try {
    if (password === c_password) {
      const res = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({
          fname,
          lname,
          email,
          mobile,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.error) {
        warning.innerText = data.error;
      }
      if (!data.error && data.isLoggedIn) {
        warning.innerText = '';
        location.assign('/form');
      }
    } else {
      warning.innerText = 'Wrong confirm password.';
    }
  } catch (err) {
    warning.innerText = err;
    console.error(err);
  }
});

// AOS
AOS.init({
  offset: 120,
  duration: 700,
  once: true,
});

// particle effect
document.addEventListener(
  'DOMContentLoaded',
  function () {
    daisyjs(document.querySelector('body'), {
      dotColor: '#ddd',
      lineColor: '#555',
    });
  },
  false
);
