const form = document.querySelector('form');
const warning = document.querySelector('.warning');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // get values
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
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
  } catch (err) {
    warning.innerText = err;
    console.log(err);
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
