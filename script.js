// Switch between Login and Sign Up tabs
function switchTab(tab) {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');

  tabs.forEach((t, i) => {
    t.classList.toggle('active', (i === 0) === (tab === 'login'));
  });

  panels.forEach((p) => {
    p.classList.toggle('active', p.id === tab);
  });
}

// Password strength checker
function checkStrength(val) {
  let score = 0;

  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const bars = document.getElementById('strength-bars');
  bars.className = 'strength' + (score ? ' s' + score : '');

  const hints = [
    'At least 8 characters',
    'Too short — add more characters',
    'Add numbers or symbols',
    'Almost there — try a symbol',
    'Strong password'
  ];

  document.getElementById('pwd-hint').textContent = hints[score];
}

// ================= SIGNUP =================

document.querySelector('.signup-btn').addEventListener('click', async () => {

  const firstName = document.getElementById('s-first').value;
  const lastName = document.getElementById('s-last').value;
  const email = document.getElementById('s-email').value;
  const password = document.getElementById('s-password').value;

  try {

    const res = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    });

    const data = await res.json();

    alert(data.message);

  } catch (err) {
    console.log(err);
    alert('Signup failed');
  }

});

// ================= LOGIN =================

document.querySelector('#login .btn-primary').addEventListener('click', async () => {

  const email = document.getElementById('l-email').value;
  const password = document.getElementById('l-password').value;

  try {

    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    alert(data.message);

  } catch (err) {

    console.log(err);
    alert('Login failed');

  }

});