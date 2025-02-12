// Implementation using a loop
var sum_to_n_a = function (inputElement) {
  const n = parseInt(inputElement.value);
  if (isNaN(n) || n < 1) {
    document.getElementById("output-error").innerHTML =
      "Please enter a valid number";
    return;
  }
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  console.log(sum);
  document.getElementById("output-error").innerHTML = "";
  document.getElementById("output-value1").innerHTML = sum;
};

// Implementation using recursion

var sum_to_n_b = function (inputElement) {
  const n = parseInt(inputElement.value);
  if (isNaN(n) || n < 1) {
    document.getElementById("output-error").innerHTML =
      "Please enter a valid number";
    return;
  }
  let sum = 0;
  function sum_to_n(n) {
    if (n === 1) return 1;
    return n + sum_to_n(n - 1);
  }
  sum = sum_to_n(n);
  console.log(sum);
  document.getElementById("output-error").innerHTML = "";
  document.getElementById("output-value2").innerHTML = sum;
};

// Implementation using the arithmetic series formula
var sum_to_n_c = function (inputElement) {
  const n = parseInt(inputElement.value);
  if (isNaN(n) || n < 1) {
    document.getElementById("output-error").innerHTML =
      "Please enter a valid number";
    return;
  }
  let sum = (n * (n + 1)) / 2;
  console.log(sum);
  document.getElementById("output-error").innerHTML = "";
  document.getElementById("output-value3").innerHTML = sum;
};

var sum_to_n_total = function (inputElement) {
  sum_to_n_a(inputElement);
  sum_to_n_b(inputElement);
  sum_to_n_c(inputElement);
};
