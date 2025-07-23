// --------------------- Site‑wide helpers --------------------- //
const cartKey = 'sweetTreatsCart';

// Read cart from localStorage or fallback to []
function getCart(){
  return JSON.parse(localStorage.getItem(cartKey) || '[]');
}
function setCart(arr){
  localStorage.setItem(cartKey, JSON.stringify(arr));
  updateCartCount();
}
function updateCartCount(){
  document.querySelectorAll('#cartCount').forEach(span => span.textContent = getCart().length);
}

// --------------------- Product data -------------------------- //
const products = [
  {id: 1, name: 'Homemade Bread', price: 300, img: 'bread.jpg'},
  {id: 2, name: 'Chocolate Cake', price: 1200, img: 'cake.jpg'},
  {id: 3, name: 'Choco‑Chip Cookies (6pc)', price: 450, img: 'cookie.jpg'},
  {id: 4, name: 'Red Velvet Cupcake', price: 250, img: 'red velvet cake.jpg'},
  {id: 5, name: 'Blueberry Muffin', price: 200, img: 'muffins.jpg'},
  {id: 6, name: 'Almond Croissant', price: 350, img: 'croissant.jpg'},
  {id: 7, name: 'Cheese Danish', price: 400, img: 'CheezeDanish.jpg'},
  {id: 8, name: 'Vanilla Sponge Roll', price: 500, img: 'sponge roll.jpg'},
  {id: 9, name: 'Strawberry Tart', price: 450, img: 'strawberry tart.jpg'},
  {id:10, name: 'Lemon Drizzle Cake', price: 600, img: 'lemon drizzle cake.jpg'},
  {id:11, name: 'Cinnamon Cake', price: 300, img: 'cinnamon cake.jpg'},
  {id:12, name: 'Mini Quiche (Box of 4)', price: 550, img: 'quiche.jpg'},
  {id:13, name: 'Peach Cobbler', price: 650, img: 'peach cobbler.jpg'},
  {id:14, name: 'Nutella Brownies (4pc)', price: 500, img: 'nutella brownies.jpg'},
  {id:15, name: 'Garlic Cheese Bun', price: 180, img: 'cheeze bun.jpg'},
  {id:16, name: 'Fruit & Nut Bread', price: 400, img: 'fruit and nut bread.jpg'},
  {id:17, name: 'Pineapple Upside Cake', price: 700, img: 'pineapple cake.jpg'},
  {id:18, name: 'Butter Croissant', price: 300, img: 'butter corroisant.jpg'}
];


// --------------------- Menu page rendering ------------------- //
function renderMenu(){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  const html = products.map(p => `
    <div class="card product">
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p class="price">Rs ${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`).join('');
  grid.innerHTML = html;
}

function addToCart(id){
  const cart = getCart();
  cart.push(id);
  setCart(cart);
  alert('Added to cart!');
}

// --------------------- Cart page rendering ------------------- //
function renderCart(){
  const wrapper = document.getElementById('cartTableWrapper');
  if(!wrapper) return;
  const ids = getCart();
  if(ids.length === 0){
    document.getElementById('emptyMsg').classList.remove('hidden');
    return;
  }
  document.getElementById('emptyMsg').classList.add('hidden');
  document.getElementById('checkoutForm').classList.remove('hidden');
  const rows = ids.map((id,i)=>{
    const p = products.find(pr => pr.id===id);
    return `<tr><td>${p.name}</td><td>Rs ${p.price}</td><td><button onclick="removeItem(${i})">×</button></td></tr>`;
  }).join('');
  const total = ids.reduce((sum,id)=> sum + products.find(p=>p.id===id).price,0);
  wrapper.innerHTML = `<table><thead><tr><th>Item</th><th>Price</th><th></th></tr></thead><tbody>${rows}</tbody><tfoot><tr><th>Total</th><th>Rs ${total}</th><th></th></tr></tfoot></table><button class="btn-secondary mt-3" onclick="clearCart()">Clear Cart</button>`;
}

function removeItem(index){
  const cart = getCart();
  cart.splice(index,1);
  setCart(cart);
  renderCart();
}
function clearCart(){
  setCart([]);
  renderCart();
}

// --------------------- Checkout form ------------------------ //
const checkoutForm = document.getElementById('checkoutForm');
if(checkoutForm){
  checkoutForm.addEventListener('submit',e=>{
    e.preventDefault();
    const order = {
      name: document.getElementById('custName').value,
      phone: document.getElementById('custPhone').value,
      address: document.getElementById('custAddress').value,
      items: getCart().map(id => products.find(p=>p.id===id)),
      total: getCart().reduce((s,id)=> s+products.find(p=>p.id===id).price,0),
      placed: new Date().toLocaleString()
    };
    console.table(order);
    alert('Thank you! Your order has been placed. We will call to confirm.');
    setCart([]);
    renderCart();
  });
}

// --------------------- Navigation active link -------------- //
function setActiveNav(){
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active');
  });
}

// --------------------- Mobile nav (optional) --------------- //
// Add burger button & nav.open toggling if needed

// --------------------- Bootstrapping ------------------------ //
window.addEventListener('DOMContentLoaded',()=>{
  updateCartCount();
  renderMenu();
  renderCart();
  setActiveNav();
});

// End of script ================================================ */
