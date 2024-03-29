'use strict';

/* ------------------------------------------------------------------------------------------------
CHALLENGE 1

Write a function named validatePin that uses a regular expression pattern to validate a PIN.

If the PIN is four numerical digits long, return true. Otherwise, return false.
------------------------------------------------------------------------------------------------ */

const validatePin = (pin) => {
  // Solution code here...
  let pinRegex = /^[0-9]{4}$/;
  return pinRegex.test(pin);
};

/* ------------------------------------------------------------------------------------------------
CHALLENGE 2

Write a function named validateEmail that takes in an email address and validates it based
on several rules:
  - one word, or two words separated by a period, before the @ symbol
  - can contain numbers
  - can have any of the following top-level domains: .net, .com, or .org
  - no other special characters
  - no subdomains, ports, etc: must be of the form name@place.com, not name@sub.place.com:3000

Return either true or false.

Note: if you ever need to validate an email using a regex in practice, the Internet has the actual regex you should use. It's many many lines long.
------------------------------------------------------------------------------------------------ */

const validateEmail = (email) => {
  // Solution code here...
  // Start by filtering out special characters - non-word characters except for @ and .
  let specialRegex = /[^A-Z@.]/gi;
  if(specialRegex.test(email)) return false;
  let mailRegex = /(^)([A-Z]+\.)?([A-Z]+@)([A-Z]+)((\.com)|(\.net)|(\.org))($)/gi;
  // let's explain this from right to left -
  // ($) - ending anchor - we're only validating that the string given is a email address, not that it contains an email address
  // ((\.com)|(\.net)|(\.org)) - make sure it ends with one of the top-level domains given
  // ([A-Z]+) - any number of characters for domain name
  // ([A-Z]+@) - any number of characters for last name, with an @ for the domain
  // ([A-Z]+\.)? - allow for the possibility of a first name, with a dot separator
  // (^) - starting anchor, used for the same reasons as the ending anchor
  return mailRegex.test(email);
};

/* ------------------------------------------------------------------------------------------------
CHALLENGE 3

Write a function named validatePhoneNumber that accepts a phone number and determines if it is valid.

Acceptable formats include:
 - (555) 555-5555
 - (555)555 5555
 - 555 555-5555
 - 555-5555555
 - 555-555 5555
 - 555-555-5555
 - 555 555 5555
 - 555555-5555
 - 5555555555

Your function should include a single regular expression pattern that matches any of these formats.

Return either true or false.
------------------------------------------------------------------------------------------------ */

const validatePhoneNumber = (phoneNumber) => {
  // Solution code here...
  // So, valid formats... Let's break this into 3 sections - area code, number prefix, number postfix
  // Area code must be 3 digits, but can be encapsulated in parenthesis or not. There can be a space, dash, or nothing between area code and prefix.
  // Prefix must be 3 digits. There can be a space, dash, or nothing between the prefix and the area code. There can be a space, dash, or nothing between the prefix and postfix.
  // Postfix must be 4 digits. There can be a space, dash, or nothing between the postfix and the prefix.
  let phoneRegex = /(^)((\d{3})|(\(\d{3}\)))[ -]?\d{3}[- ]?\d{4}($)/;
  // So let's explain this from right to left
  // ($) - we're only looking at single string that either completely matches a string or not. Since it's not embedded in a string, we should use anchoring
  // \d{4} - phone numbers always end in four digits
  // [- ]? - we can have either a dash (-), a space ( ), or nothing between the postfix and prefix
  // \d{3} - prefix needs to be three digits
  // [- ]? - we can have either a dash (-), a space ( ), or nothing between the prefix and area code
  // ((\d{3})|(\(\d{3}\))) - area code needs to be three digits, with possible parens around it
  // (^) - similar to the end anchor, I want to anchor the beginning as well
  return phoneRegex.test(phoneNumber);
};

/* ------------------------------------------------------------------------------------------------
CHALLENGE 4 - Stretch Goal

Write a function named findTagNames that iterates over an array of HTML strings and uses a regular expression pattern to return the closing tags.

For example, findTagNames(['<h1>Hello, world!</h1>', '<p>Welcome to my site</p>']) returns ['/h1', '/p'].
findTagNames(['<div><h1>Hello, world!</h1></div>', '<p>Welcome to my site</p>']) returns ['/h1', '/div', '/p'].
------------------------------------------------------------------------------------------------ */

const findTagNames = elements => {
  // Solution code here...
}

/* ------------------------------------------------------------------------------------------------
TESTS

All the code below will verify that your functions are working to solve the challenges.

DO NOT CHANGE any of the below code.

Run your tests from the console: jest solutions-11.test.js
------------------------------------------------------------------------------------------------ */

describe('Testing challenge 1', () => {
  test('It should validate a PIN of exactly four digits', () => {
    expect(validatePin(1234)).toBeTruthy();
    expect(validatePin(123)).toBeFalsy();
    expect(validatePin(12345)).toBeFalsy();
    expect(validatePin('abcd')).toBeFalsy();
    expect(validatePin('7890')).toBeTruthy();
    expect(validatePin('0789')).toBeTruthy();
    expect(validatePin(789)).toBeFalsy();
    expect(validatePin('0000')).toBeTruthy();
  });
});

describe('Testing challenge 2', () => {
  test('It should match a basic email', () => {
    expect(validateEmail('joe@codefellows.com')).toBeTruthy();
  });

  test('It should match if the email contains a period', () => {
    expect(validateEmail('joe.schmoe@codefellows.net')).toBeTruthy();
  });

  test('It should match if the email contains other top-level domains', () => {
    expect(validateEmail('joe@codefellows.org')).toBeTruthy();
  });

  test('It should match if the email contains a period and other top-level domains', () => {
    expect(validateEmail('joe.schmoe@codefellows.net')).toBeTruthy();
  });

  test ('It should fail things that aren\'t email addresses', () => {
    expect(validateEmail('justastring')).toBeFalsy();
    expect(validateEmail('missing@adomain')).toBeFalsy();
    expect(validateEmail('@noname.com')).toBeFalsy();
    expect(validateEmail('.@noname.com')).toBeFalsy();
    expect(validateEmail('nolastname.@sadness.net')).toBeFalsy();
    expect(validateEmail('canadaisnotreal@canada.ca')).toBeFalsy();
    expect(validateEmail('missing.atsymbol.net')).toBeFalsy();
    expect(validateEmail('looksgood@sofar.comohnowaitthisisbad')).toBeFalsy();
    expect(validateEmail('no.middle.names@foryou.com')).toBeFalsy();
  })
});

describe('Testing challenge 3', () => {
  test('It should match the acceptable phone number formats', () => {
    expect(validatePhoneNumber('(555) 555-5555')).toBeTruthy();
    expect(validatePhoneNumber('555 555-5555')).toBeTruthy();
    expect(validatePhoneNumber('555-555-5555')).toBeTruthy();
    expect(validatePhoneNumber('555 5555555')).toBeTruthy();
    expect(validatePhoneNumber('5555555555')).toBeTruthy();
    expect(validatePhoneNumber('234 567 8910')).toBeTruthy();
  });
  test('It should not match unacceptable phone number formats', () => {
    expect(validatePhoneNumber('abcdefghij')).toBeFalsy();
    expect(validatePhoneNumber('222 222 2222 ext. 2222')).toBeFalsy();
    expect(validatePhoneNumber('(222 222-2222')).toBeFalsy();
    expect(validatePhoneNumber('222 222-2222-')).toBeFalsy();
    expect(validatePhoneNumber('(222 222- 2222')).toBeFalsy();
    expect(validatePhoneNumber('(222 222 -2222')).toBeFalsy();
    expect(validatePhoneNumber('523 555--5555')).toBeFalsy();
    expect(validatePhoneNumber('55555555555')).toBeFalsy();
    expect(validatePhoneNumber('55555555555')).toBeFalsy();
    expect(validatePhoneNumber('55555555555')).toBeFalsy();
    expect(validatePhoneNumber('55_55_5555')).toBeFalsy();
  })
});

xdescribe('Testing challenge 4', () => {
  test('It should return the closing tags', () => {
    expect(findTagNames(['<h1>Hello, world!</h1>', '<p>Welcome to my site</p>'])).toStrictEqual([ '/h1', '/p' ]);
  });
  test('It should work if there are multiple closing tags in a single string', () => {
    expect(findTagNames(['<div><h1>Hello, world!</h1></div>', '<p>Welcome to my site</p>'])).toStrictEqual([ '/h1', '/div', '/p' ]);
  });
});
