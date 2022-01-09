module.exports = {
    age: timestamp => {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const months = today.getMonth() - birthDate.getMonth()

        if (months < 0 || months == 0 && today.getDate() < birthDate.getDate()) {
            age -= 1
        }

        return age
    },
    date: timestamp => {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = String(date.getUTCMonth()).padStart(2, '0')
        const day = String(date.getUTCDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }
}