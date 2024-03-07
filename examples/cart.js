const cartItems = []

function addToCart(product) {
    cartItems.push(product)
}

function getCartItems() {
    return cartItems
}

module.exports = { addToCart, getCartItems }
