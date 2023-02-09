/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

// Scenario for logging in and signing out
Feature('Login');
Scenario('Logging in and Sign Out', ({ I }) => {
    const id = 'example@yahoo.com';
    I.amOnPage('');
    I.seeElement('.email');
    I.seeElement('.password');
    I.fillField({ css: 'input[type="email"]' }, id);
    I.fillField({ css: 'input[type="password"]' }, '123456');
    I.click({ css: 'button[type="submit"]' });
    I.wait(3);
    I.see('Welcome');
    I.click('OK');
    I.wait(2);
    I.see(id);

    I.click('Sign Out');

    I.wait(2);

    I.click('OK');

    I.see('Login Page');
});


// create random email and password
const email = `${Math.random().toString(36).substring(7)}@example.com`;
const password = Math.random().toString(36).substring(7);

Scenario('Register', ({ I }) => {
    I.amOnPage('regist');
    I.wait(2)
    I.see('Register Page');
    I.fillField({ css: 'input[type="email"]' }, email);
    I.fillField({ css: 'input[type="password"]' }, password);
    I.click({ css: 'button[type="submit"]' });
    I.wait(3)
    I.see('Register Success');
    I.click('OK');
    I.wait(3)
    I.see('Sign Out');
    I.click('Sign Out');
    I.wait(2)
    I.click('OK');
    I.see('Login Page');
});