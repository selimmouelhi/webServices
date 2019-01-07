const dict = {
    1: "follower",
    2: "friend",
    3: "restaurant"
}

const getKey = (notificationType) => {
    return Object.keys(dict).find(key => dict[key] === notificationType)
}

module.exports = {
    dict,
    getKey
}