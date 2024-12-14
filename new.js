import { menuArray } from './data.js'

const menuEl = document.getElementById('menu')
const cartEl = document.getElementById('cart')
const totalEl = document.getElementById('total-price')

// Initialize cart with default quantities
const cart = menuArray.reduce((acc, { id }) => ({ ...acc, [id]: 0 }), {})

// Render the menu
function renderMenu() {
  const html = menuArray
    .map(
      ({ name, ingredients, id, price, emoji }) => `
      <article class="menu-item">
        <div class="emoji">${emoji}</div>
        <div class="description">
          <h2>${name}</h2>
          <p class="ingredients">${ingredients.join(', ')}</p>
          <p class="price">$${price}</p>
        </div>
        <div class="add-btn" data-id="${id}">+</div>
      </article>
    `
    )
    .join('')
  menuEl.innerHTML = html
}

// Update the cart display
function updateCart() {
  let total = 0
  let cartHtml = ''

  for (const [itemId, itemCount] of Object.entries(cart)) {
    if (itemCount > 0) {
      const { name, price } = menuArray.find(
        menuItem => menuItem.id === Number(itemId)
      )
      const itemCost = price * itemCount
      total += itemCost

      cartHtml += `
        <article>
          <h3>${name} x ${itemCount} <span class="align-left">$${itemCost}</span></h3>
        </article>
      `
    }
  }

  cartEl.innerHTML = cartHtml || '<p>Your cart is empty.</p>' // Default message for empty cart
  totalEl.innerText = `$${total}`
}

// Handle click events
function handleClick(event) {
  const menuItemDataId = event.target.dataset.id
  if (menuItemDataId) {
    const itemId = Number(menuItemDataId)
    cart[itemId]++
    updateCart()
  }
}

// Event listeners
document.addEventListener('click', handleClick)

// Initial render
renderMenu()
