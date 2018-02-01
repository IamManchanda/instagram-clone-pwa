if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered');
    })
    .catch(function (err) {
      console.error(err);
    });
}

let defferedPrompt;
window.addEventListener('beforeinstallprompt', function (event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  defferedPrompt = event;
  return false;
});

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://httpbin.org/ip');
xhr.responseType = 'json';

xhr.onload = function () {
  console.log(xhr.response);
};

xhr.onerror = function () {
  console.log('Error');
};

xhr.send();

const promiseVar = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('This is executed once timer is done');
    // reject({ code: 500, message: 'An error occured' });
  }, 3000);
});

promiseVar
  .then(function (text) {
    console.log(text);
  })
  .catch(function (err) {
    console.error(err.code, err.message);
  });

fetch('http://httpbin.org/ip')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  });

fetch('http://httpbin.org/post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  mode: 'cors',
  body: JSON.stringify({
    message: 'Does this work',
  }),
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  });

console.log('This is executed right after setTimeout');
