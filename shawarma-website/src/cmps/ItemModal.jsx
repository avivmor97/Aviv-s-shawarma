import React, { useState } from 'react'

export const ItemModal = ({ item, closeModal, addToCart }) => {
  const [customization, setCustomization] = useState({
    removedIngredients: [],
    extras: [],
    size: 'Medium',
  })

  const allExtras = ['Fries', 'Hummus', 'Salad', 'Onion', 'Pickles', 'Tahini', 'Amba']
  const drinkSizes = ['Small', 'Medium', 'Large']

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

  const handleSizeChange = (size) => {
    setCustomization((prev) => ({ ...prev, size }))
  }

  const handleConfirm = () => {
    let finalPrice = item.price + customization.extras.length * 1.99

    if (item.category === 'Drinks') {
      if (customization.size === 'Small') finalPrice -= 0.5
      if (customization.size === 'Large') finalPrice += 0.5
    }

    const customizedItem = {
      ...item,
      removedIngredients: customization.removedIngredients,
      extras: customization.extras,
      size: item.category === 'Drinks' ? customization.size : undefined,
      price: finalPrice,
    }

    addToCart(customizedItem)
    closeModal()
  }

  const handleCancel = () => {
    setCustomization({ removedIngredients: [], extras: [], size: 'Medium' })
    closeModal()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>✖</button>
        <h2 className='itemName'>{item.name}</h2>
        <img src={item.image} alt={item.name} className="modal-img" />
        <p>Customize your {item.name} before adding it to the cart.</p>

        <div className="custom-options">
          {/* Ingredient Removal - Only for Shawarma items */}
          {['Pita Shawarma', 'Laffa Shawarma', 'Shawarma Plate'].includes(item.name) && (
            <>
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
            </>
          )}

          {/* Add Extras - For Shawarma & Extras */}
          {['Pita Shawarma', 'Laffa Shawarma', 'Shawarma Plate', 'Fries', 'Salad', 'Plate with Hummus'].includes(item.name) && (
            <>
              <h3>Add Extras:</h3>
              <div className="option-list">
                {allExtras.map((extra) => (
                  <button
                    key={extra}
                    className={`extra-btn ${customization.extras.includes(extra) ? 'selected-extra' : ''}`}
                    onClick={() => handleAddExtra(extra)}
                  >
                    {customization.extras.includes(extra) ? `✔ ${extra}` : extra} (+$1.99)
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Choose Drink Size */}
          {['Coke', 'Coke Zero', 'Pepsi'].includes(item.name) && (
            <>
              <h3>Choose Size:</h3>
              <div className="option-list">
                {drinkSizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${customization.size === size ? 'selected-extra' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {customization.size === size ? `✔ ${size}` : size}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={handleCancel}>Cancel Changes</button>
          <button className="confirm-btn" onClick={handleConfirm}>
            Add to Cart - ${item.price + customization.extras.length * 1.99}
          </button>
        </div>
      </div>
    </div>
  )
}
