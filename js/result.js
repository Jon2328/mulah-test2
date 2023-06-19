async function getInfo() {
  try {
    const previousCollectedPoint = localStorage.getItem('previous-collected-point')
    const phoneNum = localStorage.getItem('phonenum')
    const customerInfo = await axios.post('https://mulahpoints.com/third_party', {
      operation_name: "customersInfo",
      variables: {
        phoneNumbers: [phoneNum],
        extension: "MY",
        brandId: `eyJhbGciOiJIUzI1NiJ9.eyJicmFuZF9pZCI6ImM3YjQ4OGU1LTc0ZDEtNDZjMC05YjYzLWVhZTE4ZDgxZjExMiJ9.cNMPD59vmv-kaRfoZcJQnJQm-KajRHl8MgJSXzQtgSY`
      }
    }, {
      headers: {
        'Content-Type': "application/json",
        'Token': `eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjZmYTdiYzkyLWNiMTAtNDNlOC1iOWZhLTViYThmZTUxY2Q3NiJ9.G9m3JUD8vjieTVEy84YkOqykC8XjXmfKUKWQqqmPTVI`
      }
    })
    if (customerInfo.data.data.thirdParty.customers.length >= 1) {
      document.querySelector('#collected').innerHTML = `Collected ${previousCollectedPoint} Points`
      document.querySelector('#total').innerHTML = `${customerInfo.data.data.thirdParty.customers[0].availablePoints} Points in Total`
    } else {
      throw new Error('No customer info')
    }
  } catch (err) {
    console.log(err)
  }
}

function doneClick() {
  window.location.href = './index.html'
}

getInfo()