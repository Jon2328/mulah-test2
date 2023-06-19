let phoneNum = ''
const maxPhoneNum = 9

function numpadClick(val) {
  if (phoneNum.length <= maxPhoneNum) {
    switch (Number(val)) {
      case 1: {
        phoneNum += 1
        break
      }
      case 2: {
        phoneNum += 2
        break
      }
      case 3: {
        phoneNum += 3
        break
      }
      case 4: {
        phoneNum += 4
        break
      }
      case 5: {
        phoneNum += 5
        break
      }
      case 6: {
        phoneNum += 6
        break
      }
      case 7: {
        phoneNum += 7
        break
      }
      case 8: {
        phoneNum += 8
        break
      }
      case 9: {
        phoneNum += 9
        break
      }

      case 0: {
        phoneNum += 0
        break
      }
    }
  }

  switch (val) {
    case 'Escape': {
      phoneNum = ''
      break
    }
    case 'Backspace': {
      phoneNum = phoneNum.slice(0, -1)
      break
    }
  }

  document.querySelector('#phone-number').innerHTML = phoneNum
  if (phoneNum.length >= maxPhoneNum) {
    document.querySelector('#check-icon').classList.add('green')
    document.querySelector('.cta').classList.remove('disabled')
  } else {
    document.querySelector('#check-icon').classList.remove('green')
    document.querySelector('.cta').classList.add('disabled')
  }
}

async function ctaClick() {
  if (phoneNum.length >= maxPhoneNum) {
    const formattedPhone = "60" + phoneNum
    try {
      document.querySelector('#error-msg').classList.remove('show')
      const result = await axios.post('https://mulahpoints.com/third_party', {
        operation_name: "collectPoints",
        variables: {
          phoneNumber: formattedPhone,
          extension: "MY",
          brandId: `eyJhbGciOiJIUzI1NiJ9.eyJicmFuZF9pZCI6ImM3YjQ4OGU1LTc0ZDEtNDZjMC05YjYzLWVhZTE4ZDgxZjExMiJ9.cNMPD59vmv-kaRfoZcJQnJQm-KajRHl8MgJSXzQtgSY`,
          outletName: 'SPH Bookstore',
          outletId: '2663',
          points: 300
        }
      }, {
        headers: {
          'Content-Type': "application/json",
          'Token': `eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjZmYTdiYzkyLWNiMTAtNDNlOC1iOWZhLTViYThmZTUxY2Q3NiJ9.G9m3JUD8vjieTVEy84YkOqykC8XjXmfKUKWQqqmPTVI`
        }

      })

      if (result?.data?.data?.thirdPartyCollectPoints?.result === 'Points Successfully Collected') {
        localStorage.setItem('phonenum', formattedPhone)
        localStorage.setItem('previous-collected-point', result?.data?.data?.thirdPartyCollectPoints?.collectedPoints)
        window.location.href = './result.html'
      } else {
        throw Error()
      }
    } catch (err) {
      console.log(err)
      document.querySelector('#error-msg').classList.add('show')
    }
  }
}

document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;
  const allowedName = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace', 'Escape']
  if (allowedName.includes(name)) {
    numpadClick(name)
  }
  if (name === 'Enter') {
    ctaClick()
  }
}, false);