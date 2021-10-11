let totalDai = 0;
let totalConvertedDai = 0;
let totalWeth = 0;
let amountToConvert = 0;

// function calcAmountToConvert(increments) {
//   return totalDai / increments;
// }

// KEEP TRACK OF USERS DAI BALANCE
const currentDaiBalance = new Map();
// KEEP TRACK OF USERS WETH
const wethClaimable = new Map();
// KEEP TRACK OF THE DAI USED UP IN ORDER TO CALCULATE THE WETHCLAIMABLE
const usedDai = new Map();

currentDaiBalance.set("Alice", 0);
wethClaimable.set("Alice", 0);
usedDai.set("Alice", 0);

currentDaiBalance.set("Bob", 0);

//TEST
console.log(currentDaiBalance.get("Alice")); // 1
console.log(currentDaiBalance.size); // Amount of users

// DEPOSIT
function deposit(user, amount) {
  let currentDai = currentDaiBalance.get("Alice");
  currentDai += amount;
  currentDaiBalance.set(user, currentDai);

  totalDai += amount;
}

//ALICE DEPOSITS 5
deposit("Alice", 45);
deposit("Alice", 5);
deposit("Bob", 5);

console.log(currentDaiBalance.get("Alice"));

//CONVERT
function convert(timestamp, amount) {
  //convert , checks that amount and timestamp is bigger than 0

  wethToAdd = amount / 5;
  //if succcess
  totalConvertedDai += amount;
  totalWeth += wethToAdd;
}

//todo more complicated function for converting
convert(1, 50);

console.log(totalDai, totalWeth, totalConvertedDai);

function checkClaim(user) {
  let daiBalance = currentDaiBalance.get("Alice");

  console.log(daiBalance, "daiblaance");
  let usedDaii = (daiBalance / totalDai) * totalConvertedDai;
  usedDai.set("Alice", usedDaii);
  let claimableWeth = (usedDaii / totalConvertedDai) * totalWeth;
  wethClaimable.set("Alice", claimableWeth);
  return claimableWeth;
}

console.log(checkClaim("Alice"));

function withdraw(user) {
  let amountToWithdraw = checkClaim(user);
  if (amountToWithdraw > 0) {
    //todo transfer

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

withdraw("Alice");
console.log(checkClaim("Alice"));
