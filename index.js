import { menuArray } from './data.js'

const menuEl = document.getElementById('menu')
const orderEl = document.getElementById('order')
const cartEl = document.getElementById('cart')
const totalEl = document.getElementById('total-price')
const modalEl = document.getElementById('modal')
const successEl = document.getElementById('success-msg')

// Initialize cart with default quantities
const cart = menuArray.reduce((acc, { id }) => ({ ...acc, [id]: 0 }), {})

// Render the menu
const renderMenu = () => {
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
const updateCart = () => {
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
        <article class="order-item">
          ${name} x ${itemCount} <div>$${itemCost} <span id="remove-${itemId}" class="remove align-right">🗑️ remove</span></div>
        </article>
      `
    }
  }

  orderEl.style.display = 'block'
  cartEl.innerHTML = cartHtml
  totalEl.innerText = `$${total}`
}

const renderModal = () => {
  modalEl.style.display = 'block'
  const form = document.getElementById('payment-form')

  form.addEventListener('submit', event => {
    event.preventDefault()
    console.log('Submit button was pressed!')

    const name = document.getElementById('name').value
    successEl.style.display = 'block'
    const nameEl = document.getElementById('customer-name')
    nameEl.innerText = name

    modalEl.style.display = 'none'
    orderEl.style.display = 'none'
  })
}

// Handle click events
const handleClick = event => {
  const menuItemDataId = event.target.dataset.id
  const elementId = event.target.id

  if (menuItemDataId) {
    const itemId = Number(menuItemDataId)
    cart[itemId]++
    updateCart()
    return
  }

  if (elementId === 'order-btn') {
    renderModal()
    return
  }

  if (elementId.includes('remove-')) {
    const id = Number(elementId.match(/\d+/)[0], 10)
    cart[id] = 0
    updateCart()
  }
}

// Event listeners
document.addEventListener('click', handleClick)

// Initial render
renderMenu()
