import './User.css'
import React, { useState } from 'react'
import { useApp } from '../../Context/AppContext'
import { BsPencil } from 'react-icons/bs'
import { RiSave3Fill } from 'react-icons/ri'

export const User = () => {
  const { state, dispatch } = useApp()
  const [showNameEdit, setShowNameEdit] = useState(false)
  const [editedName, setEditedName] = useState(null)

  const editNameHandler = () => {
    if (editedName.length > 3) {
      dispatch({ type: 'SET_USERS_NAME', payload: editedName })
      setShowNameEdit((showNameEdit) => !showNameEdit)
    }
  }

  return (
    <div className="user">
      {!showNameEdit && (
        <h2 className="userName">
          {state.user.name}{' '}
          <button
            className="editNameBtn"
            onClick={() => setShowNameEdit((showNameEdit) => !showNameEdit)}
          >
            {<BsPencil />}
          </button>
        </h2>
      )}
      {showNameEdit && (
        <p>
          <input
            className="addressInput"
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button className="editNameBtn" onClick={() => editNameHandler()}>
            {<RiSave3Fill />}
          </button>
        </p>
      )}
      {state.user.orders.map((order) => {
        return (
          <div className="orderCard" key={order._id}>
            <h2 className="orderCardName">{order.shippingAddress.name}</h2>
            <p className="orderCardItems">Items Ordered: {order.orderedProducts.length}</p>
          </div>
        )
      })}
    </div>
  )
}
