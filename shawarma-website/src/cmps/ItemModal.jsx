import React, { useState } from 'react'

export const ItemModal = ({ item, closeModal, addToCart }) => {
  const [customization, setCustomization] = useState({
    removedIngredients: [],
    extras: [],
  })

  const allExtras = ['Fries', 'Hummus', 'Salad', 'Onion', 'Pickles', 'Tahini', 'Amba']

  const handleRemoveIngredient = (ingredient) => {
    setCustomization((prev) => ({
      ...prev,
      removedIngredients: prev.removedIngredients.includes(ingredient)
        ? prev.removedIngredients.filter((ing) => ing !== ingredient)
        : [...prev.removedIngredients, ingredient],
    }))
  }

  const handleAddExtra = (extra) => {
    setCustomization((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }))
  }

  const handleConfirm = () => {
    const customizedItem = {
      ...item,
      removedIngredients: customization.removedIngredients,
      extras: customization.extras,
      price: item.price + customization.extras.length * 1.99, // Extras cost 1.99 each
    }
    addToCart(customizedItem)
    closeModal()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>✖</button>
        <h2>{item.name}</h2>
        <img src={item.image} alt={item.name} className="modal-img" />
        <p>Customize your {item.name} before adding it to the cart.</p>

        <div className="custom-options">
          <h3>Remove Ingredients:</h3>
          <div className="option-list">
            {['Onion', 'Pickles', 'Tahini', 'Amba'].map((ingredient) => (
              <button
                key={ingredient}
                className={customization.removedIngredients.includes(ingredient) ? 'selected' : ''}
                onClick={() => handleRemoveIngredient(ingredient)}
              >
                {customization.removedIngredients.includes(ingredient) ? `❌ ${ingredient}` : ingredient}
              </button>
            ))}
          </div>

          <h3>Add Extras:</h3>
          <div className="option-list">
            {allExtras.map((extra) => (
              <button
                key={extra}
                className={customization.extras.includes(extra) ? 'selected' : ''}
                onClick={() => handleAddExtra(extra)}
              >
                {customization.extras.includes(extra) ? `✔ ${extra}` : extra} (+$1.99)
              </button>
            ))}
          </div>
        </div>

        <button className="confirm-btn" onClick={handleConfirm}>
          Add to Cart - ${item.price + customization.extras.length * 1.99}
        </button>
      </div>
    </div>
  )
}
