$(document).ready(function () {
  $('.close-btn').click(function () {
    $('.togglenav').toggle('slow');
  });
  $('.togglenav ul li a').click(function () {
    $('.togglenav').hide('slow');
  });
});
$(document).ready(function () {
  $(window).scroll(function () {
    var ptop = $(document).scrollTop();
    if (ptop > 50) {
      $('header').addClass('headerbg');
    } else {
      $('header').removeClass('headerbg');
    }
  });
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
    daisyjs(document.getElementById('home'), {
      dotColor: '#ddd',
      lineColor: '#555',
    });
  },
  false
);

const form = document.querySelector('form');
const success = document.querySelector('.success');
const warning = document.querySelector('.warning');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // get values
  const name = form.name.value;
  const mobile = form.mobile.value;
  const email = form.email.value;
  const subject = form.subject.value;
  const message = form.message.value;

  try {
    const res = await fetch('/contact', {
      method: 'POST',
      body: JSON.stringify({
        name,
        mobile,
        email,
        subject,
        message,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.error) {
      warning.innerText = data.error;
    }
    if (!data.error && data.sentMsg) {
      success.innerText = 'Message sent successfully!';
    }
  } catch (err) {
    warning.innerText = err;
    console.error(err);
  }
});
