import { getShoppingCart } from "../utilities/fakedb";

const cartProductLoaders = async () => {
    // if cart data is in database, you have to use async await
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart)
    console.log(ids);

    const loadedProducts = await fetch(`http://localhost:5000/products-by-ids`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loadedProducts.json();


    let savedCart = [];
    for (const id in storedCart) {
        const addedProducts = products.find(product => product._id === id);
        if (addedProducts) {
            const quantity = storedCart[id];
            addedProducts.quantity = quantity;
            savedCart.push(addedProducts)
        }
    }
    // if you need to send two things
    // return [savedCart, products]

    // another option
    // return { savedCart, products }


    return savedCart;
}
export default cartProductLoaders;