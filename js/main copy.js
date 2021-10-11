let totalDai = 0;
let totalConvertedDai = 0;
let totalWeth = 0;
let amountToConvert = 0;

function calcAmountToConvert(increments) {
  return totalDai / increments;
}

user = {
  address: "0x1",
  number: 33,
  claimWeth: 3000,
};

users = [];

users.push(user);
console.log(users[0]);

let currentDaiBalances = [["0x1", 10, 0], ["0x2", 100], 0, ["0x3", 300], 0];

console.log(currentDaiBalances);
currentDaiBalances[0].push("ok");

console.log(currentDaiBalances);

console.log(users["0x1"].address);

function convert(amountToConvert) {}

let test = calcAmountToConvert(10);
console.log(test);
