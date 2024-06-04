const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//all crrencies
app.get("/getAllCurrencies", async (req, res) => {
    const nameURL = 'https://openexchangerates.org/api/currencies.json?app_id=ADDYOURAPIAPPIDHERE';

    try {
        const namesResponce = await axios.get(nameURL);
        const nameData = namesResponce.data;

        return res.json(nameData);
    } catch (err) {
        console.error(err);
    }
})

//get the target amount
app.get("/convert", async (req, res) => {
    const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

    try {
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=ADDYOURAPIAPPIDHERE`;

        const dataResponce = await axios.get(dataURL);
        const rates = dataResponce.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //final target value
        const targetAmount = (targetRate/sourceRate)*amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));

    } catch (err) {
        console.error(err);
    }
});

app.listen(5000, () => {
    console.log("Server Started!");
});
