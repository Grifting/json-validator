

function getUser() {
  return new Promise((resolve, reject) => {
    resolve({ name: 'willi', surname: 'wonker' }) // age: 29
  })
}

function getAge(user) {
  return new Promise((resolve, reject) => {
    if (user.age) {
      resolve(user.age)
    } else {
      reject({ msg: 'no age available '})
    }
  })
}

async function main() {

  let user, age

  try {
    user = await getUser()
    age = await getAge(user)
  } catch (e) {
    console.log(e)
  }

  console.log(user)
  console.log(age)
}

main()
