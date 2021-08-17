import './ProductsPage.css'
import { productsList } from '../../Data/Products'

export const ProductsPage = () => {
  return (
    <div className="productsContainer">
      {productsList.map((product) => {
        return (
          <div key={product._id} className="productCard">
            <img
              className="productImg"
              src={product.image}
              alt={product.name}
            />
            <h2 className="prodcutDetail">{`${product.name.slice(
              0,
              15,
            )}...`}</h2>
            <p className="prodcutDetail">
              <i>{product.brand}</i>
            </p>
            <p className="prodcutDetail">
              <span className="productPrice">
                  ${product.price - (product.price / 100) * product.off}
              </span>
              <span> ~ </span>
              <span style={{ textDecoration: 'line-through' }}>
                ${product.price}
              </span>
            </p>
            <button className="productCardBtn">Add to Cart</button>
          </div>
        )
      })}
    </div>
  )
}
