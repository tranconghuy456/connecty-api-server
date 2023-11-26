const hashPassword = async (password, salt) => {
    return new Promise((resolve, reject) => {
        // hash using bcrypt
        bcrypt.hash(password, salt).then((encoded) => resolve(encoded))
        .catch((error) => reject(error))
    })
}

export {hashPassword}