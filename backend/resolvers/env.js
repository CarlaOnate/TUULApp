
const env = {
    Query: {
        env: (_, {variable}) => {
            return process.env[variable]
        }
    }
}

module.exports = env
