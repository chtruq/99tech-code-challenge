const apiKey = "fca_live_vdubGVbyEhK6446JhMe5SoMxw6BptpycsojsyAh7";

const getCurrencySymbol = async () => {
  try {
    console.log(apiKey);
    const response = await axios.get(
      `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&symbols=USD,CAD,JPY,GBP,AUD,CHF,EUR`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getCurrencyRate = async (fromCurrency, toCurrency, amount) => {
  fromCurrency = fromCurrency.toUpperCase();
  toCurrency = toCurrency.toUpperCase();
  console.log(fromCurrency, toCurrency);

  try {
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${toCurrency}&base_currency=${fromCurrency}`
    );
    const exchangeRate = response.data.data[toCurrency];
    document.getElementById(
      "result"
    ).innerText = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
    console.log();
    console.log(parseFloat(amount * exchangeRate));
    document.getElementById("output-amount").value = parseFloat(
      amount * exchangeRate
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

window.getCurrencySymbol = getCurrencySymbol;
window.getCurrencyRate = getCurrencyRate;

document
  .getElementById("input-currency")
  .addEventListener("change", function () {
    const inputCurrency = this.value;
    const outputCurrencyOptions =
      document.getElementById("output-currency").options;

    for (let i = 0; i < outputCurrencyOptions.length; i++) {
      outputCurrencyOptions[i].disabled =
        outputCurrencyOptions[i].value === inputCurrency;
    }
  });

document.getElementById("convert").addEventListener("click", async function () {
  const inputCurrency = document.getElementById("input-currency").value;
  const outputCurrency = document.getElementById("output-currency").value;
  const amount = document.getElementById("amount").value;

  const currencyData = await getCurrencySymbol();

  const exchangeRate =
    currencyData.rates[outputCurrency] / currencyData.rates[inputCurrency];
  const convertedAmount = amount * exchangeRate;
  document.getElementById(
    "result"
  ).innerText = `${amount} ${inputCurrency} is equal to ${convertedAmount.toFixed(
    2
  )} ${outputCurrency}`;
});
