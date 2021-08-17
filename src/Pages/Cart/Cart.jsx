import { useState } from 'react'
import { useApp } from '../../Context/AppContext'
import { productsList } from '../../Data/Products'
import './Cart.css'

export const Cart = () => {
  const { state, dispatch } = useApp()
  const [name, setName] = useState(null)
  const [address, setAddress] = useState(null)
  const [email, setEmail] = useState(null)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [showCheckoutBox, setShowCheckoutBox] = useState(false)
  const [addressSavingError, setAddressSavingError] = useState(null)
  const removeFromCartHandler = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
    localStorage.setItem('user', JSON.stringify(state.user))
  }

  const cartWithProducts = state.user.cart.map((item) => {
    const findProduct = productsList.find(
      (product) => item.product === product._id,
    )
    return findProduct
  })

  const addAddressHandler = () => {
    if (name.length > 3 && email.length > 7 && address.length > 12) {
      dispatch({
        type: 'ADD_ADDRESS',
        payload: {
          _id: 'a' + state.user.addresses.length + 1,
          name: name,
          email: email,
          address: address,
        },
      })
      setShowAddAddress(false)
    } else
      setAddressSavingError(
        'Name must be more than 3 letters, email more than 7 letters & address mre than 12 letters.',
      )
  }

  const completeOrderHandler = (address) => {
    if(state.user.cart.length>0){
      dispatch({
        type: 'COMPLETE_ORDER',
        payload: {
          _id: 'o' + state.user.orders.length + 1,
          shippingAddress: address,
          orderedProducts: state.user.cart,
        },
      })
    }
      
  }

  const cartPrices = cartWithProducts.map((item) =>
    Math.floor(item.price - (item.price / 100) * item.off),
  )
  const cartTotal = cartPrices.reduce((curr, acc) => curr + acc, 0)

  return (
    <div className="cart">
      <div className="productsContainer">
        {state.user.cart.map((cartProduct) => {
          const productToDisplay = productsList.find(
            (product) => product._id === cartProduct.product,
          )
          return (
            <div key={productToDisplay._id} className="productCard">
              <img
                className="productImg"
                src={productToDisplay.image}
                alt={productToDisplay.name}
              />
              <h4 className="prodcutDetail">{`${productToDisplay.name.slice(
                0,
                15,
              )}...`}</h4>
              <p className="prodcutDetail">Quantity: {cartProduct.quantity}</p>
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
                onClick={() => removeFromCartHandler(productToDisplay._id)}
                className="productCardBtn"
              >
                Remove
              </button>
            </div>
          )
        })}
      </div>
      <div className="totoalAndCheckout">
        <h2>Total: $ {cartTotal}</h2>
        <button
          onClick={() =>
            setShowCheckoutBox((showCheckoutBox) => !showCheckoutBox)
          }
          className="checkoutBtn"
        >
          Checkout
        </button>
      </div>
      <div
        style={{ display: showCheckoutBox ? 'block' : 'none' }}
        className="checkoutBox"
      >
        <button
          onClick={() => setShowAddAddress((showAddAddress) => !showAddAddress)}
          className="addAddressBtn"
        >
          Add New Address
        </button>
        <div style={{ display: showAddAddress ? 'block' : 'none' }}>
          <input
            className="addressInput"
            onChange={(e) => {
              setName(e.target.value)
              setAddressSavingError(null)
            }}
            placeholder="Name"
            name="name"
            type="text"
          />
          <input
            className="addressInput"
            onChange={(e) => {
              setEmail(e.target.value)
              setAddressSavingError(null)
            }}
            placeholder="Email"
            name="email"
            type="text"
          />
          <input
            className="addressInput"
            onChange={(e) => {
              setAddress(e.target.value)
              setAddressSavingError(null)
            }}
            placeholder="Address"
            name="address"
            type="text"
          />
          <button className="addBtn" onClick={() => addAddressHandler()}>
            Add
          </button>
          <p style={{ color: 'red' }}>{addressSavingError}</p>
        </div>
        {state.user.addresses.length === 0
          ? "You don't have any address, add one."
          : state.user.addresses.map((address) => {
              return (
                <div key={address._id} className="address">
                  <h4 className="addressDetail">{address.name}</h4>
                  <p className="addressDetail">{address.email}</p>
                  <p className="addressDetail">{address.address}</p>
                  <button className="checkoutBtn" onClick={()=>completeOrderHandler(address)}>Checkout with this address</button>
                </div>
              )
            })}
      </div>
    </div>
  )
}
