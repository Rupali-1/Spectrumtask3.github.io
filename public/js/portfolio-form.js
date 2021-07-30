// AOS
AOS.init({
  offset: 120,
  duration: 600,
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

const form = document.querySelector('form');
const warning = document.querySelector('.warning');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // get values
  const fname = form.fname.value || '';
  const lname = form.lname.value || '';
  const email = form.email.value || '';
  const mobile = form.mobile.value || '';
  const dob = form.dob.value || '';
  const domain = form.domain.value || '';
  const age = form.age.value || '';
  const address = form.address.value || '';
  const bio = form.bio.value || '';
  const iYear = form.iYear.value || '';
  const iBranch = form.iBranch.value || '';
  const iClg = form.iClg.value || '';
  const gYear = form.gYear.value || '';
  const gBranch = form.gBranch.value || '';
  const gClg = form.gClg.value || '';
  const mYear = form.mYear.value || '';
  const mBranch = form.mBranch.value || '';
  const mClg = form.mClg.value || '';
  const programming = form.programming.value || '';
  const frameworks = form.frameworks.value || '';
  const other = form.other.value || '';
  const proj1_title = form.proj1_title.value || '';
  const proj1_link = form.proj1_link.value || '';
  const proj2_title = form.proj2_title.value || '';
  const proj2_link = form.proj2_link.value || '';
  const proj3_title = form.proj3_title.value || '';
  const proj3_link = form.proj3_link.value || '';

  try {
    const res = await fetch('/form', {
      method: 'PATCH',
      body: JSON.stringify({
        info: {
          fname,
          lname,
          email,
          mobile,
          dob,
          age,
          domain,
          address,
          bio,
        },
        qual: {
          iYear,
          iBranch,
          iClg,
          gYear,
          gBranch,
          gClg,
          mYear,
          mBranch,
          mClg,
        },
        skills: {
          programming,
          frameworks,
          other,
        },
        projects: {
          proj1_title,
          proj1_link,
          proj2_title,
          proj2_link,
          proj3_title,
          proj3_link,
        },
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const data = await res.json();
    if (data.error) {
      warning.innerText = data.error;
    }
    if (!data.error && data.user) {
      warning.innerText = '';
      location.assign('/form');
    }
  } catch (err) {
    warning.innerText = err;
    console.error(err);
  }
});
