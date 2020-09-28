//UI vars
const amount = document.getElementById('amount')
const interest = document.getElementById('interest')
const years = document.getElementById('years')
const monthlyPayment = document.getElementById('monthly-payment')
const totalPayment = document.getElementById('total-payment')
const totalInterest = document.getElementById('total-interest')



//Listen for submit
document.getElementById('loan-form').addEventListener('submit', (e) => {
    //hide results
    document.getElementById('results').style.display = 'none'

    console.log(amount.value);
    if (amount.value <= 0 || years.value <= 0) {
        document.getElementById('loading').style.display = 'none'
        showError('Please introduce your data')
    } else {
        document.getElementById('loading').style.display = 'block'
    }
    setTimeout(calculateResults, 2000)

    e.preventDefault()
})

function calculateResults() {

    const principal = parseFloat(amount.value)
    const calcInterest = parseFloat(interest.value) / 100 / 12
    const calcPayments = parseFloat(years.value) * 12


    //monthly payments
    const x = Math.pow(1 + calcInterest, calcPayments)
    const monthly = (principal * x * calcInterest) / (x - 1)

    if (isFinite(monthly) && amount.value >= 100 && years.value >= 1) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calcPayments).toFixed(2)
        totalInterest.value = ((monthly * calcPayments) - principal).toFixed(2)
        document.getElementById('results').style.display = 'block'
        document.getElementById('loading').style.display = 'none'
    } else {
        showError('Please check your numbers. Loan amount must be equal or bigger than 100 and the Years to repay input, must be positive numbers')
    }

}

//errors

function showError(error) {
    document.getElementById('results').style.display = 'none'
    document.getElementById('loading').style.display = 'none'
    const errorDiv = document.createElement('div')

    errorDiv.className = 'alert alert-danger'

    errorDiv.appendChild(document.createTextNode(error))

    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    //insert error

    card.insertBefore(errorDiv, heading)

    //clear error after 5 sec

    setTimeout(clearError, 5000)
}

function clearError() {
    document.querySelector('.alert').remove()
}