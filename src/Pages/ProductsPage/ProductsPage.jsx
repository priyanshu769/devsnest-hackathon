import './ProductsPage.css'
import { productsList } from '../../Data/Products'
import { useApp } from '../../Context/AppContext'
import { Link } from 'react-router-dom'

export const ProductsPage = () => {
  const { state, dispatch } = useApp()
  console.log(state)
  const addToCartHandler = (productId) => {
    dispatch({ type: 'ADD_TO_CART', payload: productId })
  }

  const inCartCheck = (productId) => {
    const productInCart = state.user.cart.find(
      (cartProduct) => cartProduct.product === productId,
    )
    if (productInCart) {
      return 'Already in Cart'
    } else return 'Add to Cart'
  }

  return (
    <div className="productsContainer">
      {productsList.map((product) => {
        return (
          <div key={product._id} className="productCard">
            <Link className="productCardLink" to={`/product/${product._id}`}>
              <img
                className="productImg"
                src={product.image}
                alt={product.name}
              />
              <h4 className="prodcutDetail">{`${product.name.slice(
                0,
                15,
              )}...`}</h4>
              <p className="prodcutDetail">
                <i>{product.brand}</i>
              </p>
              <p className="prodcutDetail">
                <span className="productPrice">
                  $
                  {Math.floor(
                    product.price - (product.price / 100) * product.off,
                  )}
                </span>
                <span> ~ </span>
                <span style={{ textDecoration: 'line-through' }}>
                  ${product.price}
                </span>
              </p>
            </Link>
            <button
              disabled={
                inCartCheck(product._id) === 'Already in Cart' ? true : false
              }
              onClick={() => addToCartHandler(product._id)}
              className="productCardBtn"
            >
              {inCartCheck(product._id)}
            </button>
          </div>
        )
      })}
    </div>
  )
}
