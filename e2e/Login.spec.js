/* eslint-disable no-undef */

Feature('Login');

Scenario('Logging in and Sign Out', ({ I }) => {
    const id = 'a@gmail.com'
    I.amOnPage('');
    I.seeElement('.email')
    I.seeElement('.password')
    I.fillField({ css: 'input[type="email"]' }, id);
    I.fillField({ css: 'input[type="password"]' }, 'kaioken12');
    I.click({ css: 'button[type="submit"]' });
    I.wait(3).then(() => {
        console.log('3 seconds have passed');
      });
    I.see('Welcome');
    I.click('OK'); // Klik OK pada SweetAlert
    I.wait(2).then(() => {
        console.log('3 seconds have passed');
      });
    I.see(id)
    I.click('Sign Out');
    I.wait(2).then(() => {
        console.log('3 seconds have passed');
      });
    I.click('OK');
    I.see('Login Page');
});


function randomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  let random_string = randomString(10);

Scenario('Register', ({ I }) => {
    I.amOnPage('regist');
    I.wait(2).then(() => {
        console.log('3 seconds have passed');
      });
    I.see('Register Page');
    I.fillField({ css: 'input[type="email"]' }, `${random_string}@yahoo.com`);
    I.fillField({ css: 'input[type="password"]' }, random_string);
    I.click({ css: 'button[type="submit"]' });
    I.wait(3).then(() => {
        console.log('3 seconds have passed');
      });
    I.see('Register Success');
    I.click('OK');
    I.wait(3).then(() => {
        console.log('3 seconds have passed');
      });
    I.see('Sign Out');
    I.click('Sign Out');
    I.wait(2).then(() => {
        console.log('3 seconds have passed');
      });
    I.click('OK');
    I.see('Login Page')
})