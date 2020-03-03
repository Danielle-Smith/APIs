//  Promises
//  used with apis
// complex
// a promise is expected to either work or it's expected to have some kind of error or some kind of issue. And so what we're doing when we're building a promise is we're telling our program that you're going to get something back you're going to either get back the successful type of response so if you're communicating with an API you're going to get back that API data and then you can deal with it. Or if there's an error then we're going to give you an error back and we're going to be able to tell you how to deal with that.
// you spend 50% time working it out and 50% of your time working out what if it comes back an error.

let sleepyGreeting = new Promise((resolve, reject) => { //common use resolve and reject
    setTimeout(() => {
      resolve('Hello....')// if it works
    }, 2000);
  
    setTimeout(() => {
      reject(Error('Too sleepy...')) // if it doesn't work
    }, 2000); //2000 is milliseconds or 2 seconds
  });
  
  sleepyGreeting
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });

// Using a fetch promise to communicate with APIs

const postsPomise = fetch('https://api.dailysmarty.com/posts') //fetch calls a promise
postsPromise
  .then(data => data.json()) //grabbing data then calling it in json format
  .then(data => { // forEach looping throught the data and grabbing url_for_post
      data.posts.forEach((item) => {
          console.log(item.url_for_post);
      });
  })
  .catch((err) => { //catch the error
      console.log(err);
  }); 

//   How to group promises together with promise.all
const greeting = new Promise((resolve, reject) =>{
    resolve('Hi there');
    reject('Oops, bad greeting');
  });
  
  const updateAccount = new Promise((resolve, reject) => {
    resolve('Updating last login...');
    reject('Error updating account with login.');
  });
  
  const loginActivities = Promise.all([greeting, updateAccount]); //make an array of promises
  
  loginActivities.then(res => { // res equals the response the response is each resolve in a array
    res.forEach(activity => { // this will go through and separate the promises and console log them separately
      console.log(activity);
    })
  })

// Introduction to Async and Await
//code that uses await and async is we've now been able to simply declare a list of when we want each one of these processes to occur in the order we want them to occur

const login = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('User logged in...');
      }, 2000);
    });
  }
  
  const updateAccount = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Updating last login...');
      }, 2000);
    });
  }
  
  async function loginActivities() {
    const returnedLogin = await login(); // makes sure the login happens before the updateAccount 
    console.log(returnedLogin);
  
    const returnedUpdateAccount = await updateAccount();
    console.log(returnedUpdateAccount);
  }
  
  loginActivities();

//   Combining Async/await with closure to ensure all processes have run
// what we're going to do now is we're going to build the system so that it will run these processes and it's still going to take the same amount of time. But what appears down in the console and in a real-world application what would appear on the screen would actually happen exactly at the same time instead of one happening and the other happening a few seconds later. The way we're going to do this is by leveraging closures
//a closure is simply a function but it's a function that can be wrapped inside of a variable and then it can be passed into other functions
// The difference between this and the las module is they will work exactly the same by going in order, but the difference in this module is nothing will show up on the screen until they both run.

const login = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('User logged in...');
      }, 4000);
    });
  }
  
  const updateAccount = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Updating last login...');
      }, 2000);
    });
  }
  
  async function loginActivities(login, updateAccount) { // these login, updateAccount can be named whatever
    const returnedLogin = await login;
    console.log(returnedLogin);
  
    const returnedUpdateAccount = await updateAccount;
    console.log(returnedUpdateAccount);
  }
  
  loginActivities(login(), updateAccount()); // remember the() because we are calling the function

//   Using Async/Await for communicating with outside APIs

async function queryApis() {
    const postsPromise = fetch('https://api.dailysmarty.com/posts');
    const posts = await postsPromise.then(res => res.json());
    console.log(posts);
  
    const reposPromise = fetch('https://api.github.com/users/jordanhudgens/repos');
    const repos = await reposPromise.then(res => res.json());
    console.log(repos);
  }
  
  queryApis();

//   Implementing error handling in an Async/Await function
// When you are calling APIs you cant call a http from codepen in a https - it will come back with a security error
async function queryApis() {
    try {                                           // wrap everythig in a try and catch block. You want to do it together if APIs need to go together or it matters the order, but if you have a bunch and they are separate and have nothing to do with each other and you want to know specifically which one is having problems, then you will do multiple try and catch blocks.
      const postsPromise = fetch('http://api.dailysmarty.com/posts');
      const posts = await postsPromise.then(res => res.json());
      console.log(posts);
    } catch(err) {
      console.log(err);
      console.log('There was an error with the DailySmarty API');
    }
  
    try {
      const reposPromise = fetch('https://api.github.com/users/jordanhudgens/repos');
      const repos = await reposPromise.then(res => res.json());
      console.log(repos);
    } catch(err) {
      console.log(err);
      console.log('There was an error with the GitHub API');
    }
  }
  
  queryApis();
