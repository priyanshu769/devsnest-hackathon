import './Product.css'
import { useParams } from 'react-router'
import { productsList } from '../../Data/Products'
import { useApp } from '../../Context/AppContext'

export const Product = () => {
  const { productId } = useParams()
  const { state, dispatch } = useApp()
  const productToDisplay = productsList.find(
    (product) => product._id === productId,
  )

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
    <div className="productPageContainer">
      <img
        className="productPageImg"
        src={productToDisplay.image}
        alt={productToDisplay.name}
      />
      <h3>{productToDisplay.name}</h3>
      <p>
        <i>{productToDisplay.brand}</i>
      </p>
      <p className="prodcutDetail">
        <span className="productPrice">
          $
          {Math.floor(
            productToDisplay.price -
              (productToDisplay.price / 100) * productToDisplay.off,
          )}
        </span>
        <span> ~ </span>
        <span style={{ textDecoration: 'line-through' }}>
          ${productToDisplay.price}
        </span>
      </p>
      <button
        disabled={
          inCartCheck(productToDisplay._id) === 'Already in Cart' ? true : false
        }
        onClick={() => addToCartHandler(productToDisplay._id)}
        className="productCardBtn"
      >
        {inCartCheck(productToDisplay._id)}
      </button>
      <p>Sizes Available:</p>
      <div className="sizesAvailable">
        {productToDisplay.sizesAvailable.map((size) => {
          return <button className="sizeBtn">{size}</button>
        })}
      </div>
      <p>Ratings:</p>
      {productToDisplay.reviews.map((review) => {
        return (
          <div>
            <p className="reviewRating">
              {review.rate} Stars
            </p>
            <p>{review.message}</p>
          </div>
        )
      })}
    </div>
  )
}
