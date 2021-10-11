let totalDai = 0;
let totalConvertedDai = 0;
let totalWeth = 0;
let amountToConvert = 0;

// KEEP TRACK OF USERS DAI BALANCE
const currentDaiBalance = new Map();
// KEEP TRACK OF USERS WETH
const wethClaimable = new Map();
// KEEP TRACK OF THE DAI USED UP IN ORDER TO CALCULATE THE WETHCLAIMABLE
const usedDai = new Map();

function addUser(address) {
  currentDaiBalance.set(address, 0);
  wethClaimable.set(address, 0);
  usedDai.set(address, 0);
}
// DEPOSIT
function deposit(user, amount) {
  let currentDai = currentDaiBalance.get(user);
  currentDai += amount;
  currentDaiBalance.set(user, currentDai);

  totalDai += amount;
}

//CONVERT
function convert(timestamp, amount) {
  //convert , checks that amount and timestamp is bigger than 0

  wethToAdd = amount / 5;
  //if succcess
  totalConvertedDai += amount;
  totalWeth += wethToAdd;

  for (let [key, value] of currentDaiBalance) {
    console.log(`${key} = ${value}`);
    updateClaim(`${key}`);
  }
}

function updateClaim(user) {
  console.log(user, "usererer");
  let daiBalance = currentDaiBalance.get(user);

  console.log(daiBalance, "daiblaance" + user);
  let usedDaii = (daiBalance / totalDai) * totalConvertedDai;

  usedDai.set(user, usedDaii);
  let claimableWeth = (usedDaii / totalConvertedDai) * totalWeth;
  wethClaimable.set(user, claimableWeth);
  return claimableWeth;
}

function withdraw(user) {
  let amountToWithdraw = wethClaimable.get(user);
  if (amountToWithdraw > 0) {
    //todo transfer

    totalWeth = totalWeth - amountToWithdraw;
    //if transfer success
    let usedDaii = usedDai.get(user);
    let newDaiBalance = currentDaiBalance.get(user) - usedDaii;

    usedDai.set(user, 0);
    //remove the DAI that alice already used up when withdrawing
    currentDaiBalance.set(user, newDaiBalance);
    // reset the wethclaimable to 0 as Alice withdrawn all
    wethClaimable.set(user, 0);
  }
}

//init users
console.log(totalWeth, "eth");
addUser("Alice");
addUser("Bob");
//TEST
console.log(currentDaiBalance.get("Alice")); //
console.log(currentDaiBalance.size); // Amount of users

// DEPOSITS
deposit("Alice", 45);
deposit("Alice", 5);
deposit("Bob", 5);
console.log(totalWeth, "eth");
console.log(currentDaiBalance.get("Alice"));
//todo more complicated function for converting
convert(1, 50);
console.log(totalWeth, "eth");
console.log(wethClaimable.get("Alice"));

console.log(wethClaimable.get("Alice"), "alicepre");

console.log(wethClaimable.get("Bob"), "bobpre");
withdraw("Alice");
console.log(totalWeth, "eth");
console.log(wethClaimable.get("Alice"), "alice after");
console.log(wethClaimable.get("Bob"), "bobafter");

deposit("Alice", 100);
console.log(totalWeth, "eth");
//todo more complicated function for converting
convert(1, 50);
console.log(totalWeth, "eth");
console.log(wethClaimable.get("Alice"), "alice after after");
console.log(wethClaimable.get("Bob"), "bobafter after");
console.log(totalWeth, "eth");
withdraw("Alice");
console.log(wethClaimable.get("Bob"), "bobafter after");
console.log(wethClaimable.get("Alice"), "alice after");
