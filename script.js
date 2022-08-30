'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Deepanshu Chhanna',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-08-16T17:01:17.194Z',
    '2022-08-20T23:36:17.929Z',
    '2022-08-21T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'hi-IN', // de-DE
};

const account2 = {
  owner: 'Hitesh Soni',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Shivam Soni',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2021-10-01T13:15:33.035Z',
    '2021-01-30T09:48:16.867Z',
    '2021-02-25T06:04:23.907Z',
    '2022-02-25T14:18:46.235Z',
    '2022-05-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-05-25T18:49:59.371Z',
    '2022-06-26T12:01:20.894Z',
  ],
  currency: 'AED',
  locale: 'ar-AE',
};

const account4 = {
  owner: 'Ashish Yadav',
  movements: [430, 1000, 700, 50, 90, -89, 94, 359],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2021-09-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2021-02-25T06:04:23.907Z',
    '2022-04-25T14:18:46.235Z',
    '2022-06-05T16:33:06.386Z',
    '2021-04-10T14:43:26.374Z',
    '2019-05-25T18:49:59.371Z',
    '2021-06-26T12:01:20.894Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const accounts = [account1, account2, account3, account4];
// const accounts = [account1, account2];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//FUNCTIONS//

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayPassed = calcDaysPassed(new Date(), date);
  console.log(dayPassed);

  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    /////////////////////  NEW FORMAT  ////////////////

    return Intl.DateTimeFormat(locale).format(date);
  }
};

const formattedCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = ''; // for empty container

  const moves = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; // making copy by using slice and by using sort sorting the elements

  moves.forEach(function (move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMove = formattedCurr(move, acc.locale, acc.currency);
    // creating html templates
    const html = `
     <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>

    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMove}</div>

  </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovement(account1.movements);

/**************************** */

//  IMPORTANT PART - MAP's //

/****************************** */

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accu, move) => accu + move, 0);
  // Internationalization Numbers

  labelBalance.textContent = formattedCurr(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(move => move > 0)
    .reduce((accu, move) => accu + move, 0);
  labelSumIn.textContent = formattedCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(move => move < 0)
    .reduce((accu, move) => accu + move, 0);

  labelSumOut.textContent = formattedCurr(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(move => move > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((accu, int) => accu + int, 0);

  labelSumInterest.textContent = formattedCurr(
    interest,
    acc.locale,
    acc.currency
  );
};

// calcDisplaySummary(account1.movements);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner // splitting the owner name into userName
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

//  Creating a updateUI fn //

const updateUI = function (acc) {
  // Display Movements//

  displayMovement(acc);
  // Display Balance//
  calcDisplayBalance(acc);
  // Display Summary//

  calcDisplaySummary(acc);
};

// console.log('accounts:', accounts);

/*

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, move) => acc + move, 0);

  labelBalance.textContent = `${balance} EUR`;
};

calcDisplayBalance(account1.movements);


*/

/********************************/
//  IMPORTANT PART - FILTER's //

/********************************/
/***** DEPOSITOR ***** */

/*
//  SAME CODE BY USING for loop

// const depositFor = [];
// for (const move of movements) if (move > 0) depositFor.push(move);
// console.log(depositFor);

*/

/**************************** */

/***** WITHDRAWAL ***** */

/**************************** */
/*
const withdrawals = movements.filter(move => move < 0);
console.log('Withdrawals:', withdrawals);

*/

/*********************************** */
//  IMPORTANT PART - /*REDUCE Method */-> to boil down all the elements in an array to one single value ex:  adding all elements in a single array //

/*********************************** */
// reduce uses parameter as accumulator(some of all previous value   )

/*console.log('movements :', movements);

const balance = movements.reduce(function (accu, currv, i, arr) {
  console.log(`Iteration ${i} :${accu}`);
  return accu + currv;
}, 10); // here 10 -> initial value of the accumulator

console.log(balance);

*/

//  same thing by manually using for loop

/*let balance2 = 10; // here 10 -> initial value of the accumulator
for (const move of movements) balance2 += move;
console.log(balance2);

*/

//  same thing by manually using arrow fn

/*const balance3 = movements.reduce((accu, currv) => accu + currv, 10);

console.log(balance3); // here 10 -> initial value of the accumulator
*/

/*********** */
// Maximum Value

const max = movements.reduce((accu, move) => {
  if (accu > move) return accu;
  else {
    return move;
  }
}, movements[0]);

console.log(max);

/********************** */
/***** MAGIC OF CHAINING METHODS - All in ONE  ***** */
/********************** */

const rsToUsd = 0.013; // 1₹ = 0.013$
const totalDepositsUSD = movements
  .filter(move => move > 0)
  .map(move => move * rsToUsd)
  .reduce((accu, move) => accu + move, 0);

console.log(totalDepositsUSD);

/************************* */
/**** Login System  **** */
/************************* */

//  For setTimeIntervals//

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    /*3)In each call, Print the remaining time to UI*/

    labelTimer.textContent = `${min}:${sec}`;

    /*5)when 0 sec, stop timer and log out user*/

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get Started... ';
      containerApp.style.opacity = 0;
    }

    /*4)Decrease Is*/

    time--;
  };

  /*1)set time to 5 min.*/
  let time = 120; // 120sec = 2 min

  /*2)call the timer every second */
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
// EVENT HANDLERS

let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // prevent form from submitting
  // console.log('Login');

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  ); //line-127 for useName concept

  console.log(currentAccount);

  //  for password

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and A welcome message if pin is correct//

    labelWelcome.textContent = `Welcome Back... ${
      currentAccount.owner.split(' ')[0]
    } `;

    containerApp.style.opacity = 100;
    // created current date for date below current Balance
    /* const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;*/

    //////////// REPLACING ABOVE CODE WITH THIS CODE //////////////////
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    //const locale = navigator.language; // for the language you have in your browser
    //console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); //using Internationalizing Dates API i.e; Intl
    ///////////////////////////

    //clear the input fields //
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    /* // Display Movements//

    displayMovement(currentAccount.movements);
    // Display Balance//
    calcDisplayBalance(currentAccount);
    // Display Summary//

    calcDisplaySummary(currentAccount);

    */

    // converting above code in a single line code of fn. update
    //  TIMER

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //UPDATE UI//
    updateUI(currentAccount);

    // RESET TIMER
    clearInterval(timer); // here timer variable is a global variable
    timer = startLogOutTimer();
  }
});

/************************* */
/**** Transfer System  **** */
/************************* */

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // almost use preventDefault() when working with forms

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  // console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';

  // Amount checking condition wheather the amount is negative or more than the current balance of the transfering account //

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // console.log('Transfer Valid ');

    //Doing Transfer //
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Adding Transfer or loan  Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //UPDATE UI//
    updateUI(currentAccount);
  }
});

/************************* */
/**** DEPOSIT System  **** */
/************************* */

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(move => move >= amount * 0.1) // using condition for 10% = 0.1  = amount/10 loan
  ) {
    setTimeout(function () {
      //ADD MOVEMENT //
      currentAccount.movements.push(amount);

      // Adding Loan Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // UPDATE UI //

      updateUI(currentAccount);

      // RESET TIMER
      clearInterval(timer); // here timer variable is a global variable
      timer = startLogOutTimer();
    }, 2500);
  }

  inputLoanAmount.value = '';
});

/************************* */
/**** Close Account  System  --> By using findIndex Method **** */
/************************* */

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //  Conditions to confirm the user and pin

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    console.log(index);

    // DELETE ACCOUNT //
    accounts.splice(index, 1);

    //  HIDE UI //
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

const overalBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((accu, move) => accu + move, 0);

console.log(overalBalance);

/****************** */
/**** SORT SYSTEM WORKING **** */
/****************** */

//  to rollback to the normal state

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted; //flip
});

/*
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);

const overalBalance = allMovements.reduce((accu, move) => accu + move, 0);
console.log(overalBalance);

*/

//  using chaining method  for above code

// FLAT //
/*
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((accu, move) => accu + move, 0);

console.log(overalBalance);

*/

/*

//CHAINING BY  FLATMAP --> for better performance and it only goes 1 level deep for more deep levels we have to use the flat method   //
const overalBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((accu, move) => accu + move, 0);

console.log(overalBalance);


*/

/**************************************************************** */
/* ****** CONCEPT ******   
// SOME AND EVERY METHOD 

console.log(movements);

// FOR EQUALITY - we use includes method

console.log(movements.includes(-130));

//  FOR CONDITION - we use some method 
console.log(movements.some(move => move === -130));

const anyDeposits = movements.some(move => move > 0);
console.log(anyDeposits);

//  FOR CONDITION - we use every method  ,we use every method if out element passes all the conditions  
console.log(movements.every(move => move > 0));
console.log(account4.movements.every(move => move > 0));

// Separate callback -- for dry code

const deposit = move => move > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/******************************************************************* */

/********************************************************************* */
/* ****** CONCEPT  - flat and flatMap ********

const arr = [[1, 2, 3], [5, 6, 8], 9, 7];

console.log(arr.flat()); // no callback fn. is needed , it removes the nested array
const arrDeep = [[1, [2, 3]], [[5, 6], 8], 9, 7];

console.log(arrDeep.flat());
console.log(arrDeep.flat(2));
*/
/************************************************************** */

/*******************************************************************/
/**** NUMBERS CONCEPT ******

// Note : All numbers in JS are represented as flotting point numbers internally , numbers are always stored in binary format

// Base 10 - 0 to 9
// Base 2 - 0 1

console.log(22 === 22.0); // result - true
console.log(0.1 + 0.2 === 0.3); // result - false  -> in JS

// convert string to number - concept//

console.log(Number('23'));
console.log(+'23'); // coercision // to write clean code us this method

// *** parsing -concept *** //
// Parsing Integers //
console.log(Number.parseInt('30px')); // result  - 30
console.log(Number.parseInt('px30')); // result  - NaN -> not work
// Parsing float //
console.log(Number.parseInt('2.5rem')); // result - 2
console.log(Number.parseFloat('2.5rem')); // result - 2.5
console.log(parseFloat('2.5')); // result -  2.5

// *** to check a number is not a number t  *** //
console.log(Number.isNaN(20)); // result - false // for integer
console.log(Number.isNaN('20')); // result - false // for string
console.log(Number.isNaN(+'20x')); // result - true // here trying to convert
console.log(Number.isNaN(22 / 0)); // result - false  // value will be infinite

// *** to check a number *** //

console.log(Number.isFinite(20)); // result - true
console.log(Number.isFinite('20')); // result - false
console.log(Number.isFinite(+'20x')); // result - false
console.log(Number.isFinite(20 / 0)); // result - false

// *** to check a integer *** //

console.log(Number.isInteger(20)); // result - true
console.log(Number.isInteger(20.0)); // result - true
console.log(Number.isInteger(20 / 0)); // result - false


*/

/*********************************************************************/

/*********************************************************************/

/***** MATH AND ROUNDING - CONCEPT ****** 

// to calc. squarerooT AND Cubic root
console.log(Math.sqrt(25)); // sqrt fn.
console.log(25 ** 1 / 2); // exponentially for squareroot
console.log(8 ** 1 / 3); // exponentially for cubicroot

// for max and min

console.log(Math.max(5, 3, 2, 44, 22, 41)); // max . fn // op - 44
console.log(Math.max(5, 3, 2, '44', 22, 41)); // max . fn //op-44
console.log(Math.max(5, 3, 2, '44px', 22, 41)); // max . fn //op- NaN

console.log(Math.min(5, 3, 2, 44, 22, 41)); // min. fn // op - 2

console.log(Math.PI * Number.parseFloat('10px') ** 2); // radius of circle

console.log(Math.trunc(Math.random() * 6) + 1); // random no. from 1 to 6 and use trunc to avoid decimal part

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min; // creating a fn to get the random no. as (max-min) -min...max
console.log(randomInt(10, 20)); // as we have give no.s as 10 , 20 so ,we get the random no. b/w 12 to 20 // its b/w 12 and 20 because we have added 1 as done in fn.

//Rounding INTEGERS //
console.log(Math.trunc(23.3)); //op-23

console.log(Math.round(23.3)); //op-23
console.log(Math.round(23.9)); //op-24

console.log(Math.ceil(23.3)); //op-24
console.log(Math.ceil(23.9)); //op-24

console.log(Math.floor(23.3)); //op-23
console.log(Math.floor(23.9)); //op-23
console.log(Math.floor('23.9')); //op-23

//trunc v/s floor
console.log(Math.floor(-23.3)); //op : -23
console.log(Math.floor(23.3)); //op: -24

//ROUNDING DECIMALS
console.log((2.7).toFixed(0)); //op: 3 ->String
console.log((2.7).toFixed(3)); //op: 2.700 ->String
console.log((2.345).toFixed(2)); //op: 2.35 ->String
console.log(+(2.345).toFixed(2)); //op: 2.35 ->Number

*/

/******************************************************************** */

/******************************************************************** */
/******* REMAINDER OPERATOR CONCEPT - GIVES THE Op on divison******** 

console.log(5 % 2); //op : 1
console.log(5 / 2); //op : 2.25 ->5=2*2+1
console.log(8 % 3); //op : 2
console.log(8 / 3); //op : 2.666 -> 8 = 2*3+2
console.log(6 % 2); //op : 0
console.log(6 / 2); //op :3
console.log(7 % 2); //op : 1
console.log(7 / 2); //op :3.55

// CREATING A FN.

const isEven = n => n % 2 === 0;
console.log(isEven(8)); //op: true
console.log(isEven(23)); // op: false
console.log(isEven(154)); // op : true


// JUST FOR FUN😁 
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // for 0,2,4,6,...
    if (i % 2 === 0) row.style.backgroundColor = 'red';
    // for 0,3,6,9,...
    if (i % 3 === 0) row.style.backgroundColor = 'black';
  });
});


*/
/********************************************************************* */

/******************************************************************** */
/****** BigInt -CONECPT ********

console.log(2 ** 53 - 1); // largest no. that js can store more than this no. is not correct for numbers

//  to store as large no. as we want we need to use BigInt i.e; intr. in ES2020

console.log(56596187827817859775481748227878482984824871445n); // here n converts a regular no into a BigInt no.

// we can also use BigInt fn. to conert no. without n - only be used with small no.s

console.log(BigInt(248348838738434));

//opertations //
console.log(10000n + 100000n);

const huge = 846948469879824245687426415n;
const num = 23;
console.log(huge + BigInt(num)); // here we need BigInt otherwise we get an errror

// operators  - not work //
console.log(Math.sqrt(20n)); // op: error

// expceptions//
console.log(20n > 15); //op: true
console.log(20n === 20); //op : false
console.log(typeof 20n); //op : bigint
console.log(20n == '20'); //op : true

// string concatination
console.log(huge + 'is really big..');

//Divisions//
console.log(10n / 3n); //op: 3n -> it cut of the deccimal part
console.log(10 / 3); //op: 3.3333


*/
/********************************************************************* */
/******************************************************************** */
/****** Create DATES  -CONECPT *********
// 4 ways to Create Dates :

// way-1
const now = new Date(); // auto updatable via laptops  time and date
console.log(now);

//way-2 - by passing the string

console.log(new Date('Aug 22 2022 12:47:33')); // not autoupdatable

// way-3

console.log(new Date(2022, 7, 22, 12, 52, 5)); // 7 -> aug as we know aug is 8th month but js index start from 0 i.e; aug is 7 here

console.log(new Date(0)); // uneex time i.e; 1970

// way-4
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // here 3 is the current date , 24 is hour , 60 for min , 60 for sec , 1000 for millisecond

//WORKING WITH DATES//
const future = new Date(2047, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); // to get day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // follow International Standard
console.log(future.getTime()); // to get Time timeStamp that has passed since Jan 1, 1970

//  to convert above date code to the date code we pass

console.log(new Date(2457769980000));

//  to get time passed from jan 1,1970 to currenttime
console.log(Date.now());

*/
/********************************************************************* */

/********************************************************************* */
/***********OPERATIONS WITH DATES************************************* *
const future = new Date(2038, 10, 19, 21, 21);
console.log(+future);

const calcDaysPassed = (date1, date2) => date2 - date1;

const day1 = calcDaysPassed(new Date(2028, 3, 17), new Date(2028, 3, 27));

console.log(day1); // result will come in milli seconds

// convert milli sec to date//

const calcDaysPassed_1 = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); //imp part
//  we use Math.abs - to avoid the -ve value

const day2 = calcDaysPassed_1(new Date(2028, 3, 17), new Date(2028, 3, 27));

console.log(day2);

*/

/********************************************************************* */

/******************************************************************** */
/************** Internationalizing Numbers (Intl) -PART-2 ********** 

const num = 2376368278.28;

const options = {
  style: 'unit', //unit ,percent,currency (we have to define the currency as we define the unit like for ₤ -> use like this  'EUR')
  unit: 'mile-per-hour',
};

console.log('US:  ', new Intl.NumberFormat('en-US', options).format(num));
console.log('INDIA:  ', new Intl.NumberFormat('hi-IN', options).format(num));
console.log('Syria:  ', new Intl.NumberFormat('ar-SY', options).format(num));

console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num)
);

*/
/********************************************************************* */

/********************************************************************* */
/*********TIMERS : 1)setTimeOut 2)setInterval************ 

// setTimeOut - used for a particular time after that set time will be out  //
const ing = ['Corn', 'Onion'];

const pT = setTimeout(
  (ing1, ing2) => console.log(`Here is ur pizza with ${ing1} and ${ing2}`),
  3000, // 3000 milliSec = 3sec
  ...ing
);

console.log('Waiting');

// Condition

if (ing.includes('Onion')) clearTimeout(pT);

// setInterval - used for a an interval change time like countdown//

setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000); // here 1000 mili-sec = 1 sec


*/

/********************************************************************* */
