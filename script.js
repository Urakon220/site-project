            const products = [
            { id: 1, title: "MacBook Pro 16\"", price: 89999, category: "tech", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=500&q=60" },
            { id: 2, title: "iPhone 15 Pro", price: 45999, category: "tech", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=60" },
            { id: 3, title: "Sony WH-1000XM5", price: 12999, category: "tech", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=60" },
            { id: 4, title: "Чоловіча куртка зимова", price: 3499, category: "clothing", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=60" },
            { id: 5, title: "Жіноча сукня вечірня", price: 4599, category: "clothing", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=500&q=60" },
            { id: 6, title: "PlayStation 5", price: 19999, category: "games", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=60" },
            { id: 7, title: "God of War Ragnarök", price: 1799, category: "games", img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=500&q=60" },
            { id: 8, title: "Xbox Controller Elite", price: 5999, category: "games", img: "https://images.unsplash.com/photo-1605635734392-80bac582307c?auto=format&fit=crop&w=500&q=60" },
            { id: 9, title: "Набір ароматичних свічок", price: 899, category: "gifts", img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=500&q=60" },
            { id: 10, title: "Подарунковий бокс преміум", price: 2499, category: "gifts", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=60" },
            { id: 11, title: "Плюшевий ведмідь", price: 1299, category: "gifts", img: "https://images.unsplash.com/photo-1559454403-b8fb87521bc7?auto=format&fit=crop&w=500&q=60" },
        ];

        let cart = [];

        function renderProducts(filter = 'all') {
            const container = document.getElementById('product-container');
            container.innerHTML = '';

            const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

            filtered.forEach(product => {
                const card = `
                    <div class="card">
                        <img src="${product.img}" alt="${product.title}" class="card-img">
                        <div class="card-body">
                            <span class="category-tag">${getCategoryName(product.category)}</span>
                            <h3 class="card-title">${product.title}</h3>
                            <p class="card-desc">Якісний товар з категорії ${getCategoryName(product.category)}. Гарантія якості.</p>
                            <div class="card-footer">
                                <span class="price">${product.price} ₴</span>
                                <button class="add-btn" onclick="addToCart(${product.id})">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                                    Додати
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        }

        function getCategoryName(cat) {
            const names = { 'tech': 'Техніка', 'clothing': 'Одяг', 'games': 'Ігри', 'gifts': 'Подарунки' };
            return names[cat] || 'Товар';
        }

        // Filter Logic
        function filterProducts(category, btn) {
            // Update UI buttons
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Re-render
            renderProducts(category);
        }

        // Cart Logic
        function addToCart(id) {
            const product = products.find(p => p.id === id);
            cart.push(product);
            updateCartUI();
            
            // Simple visual feedback
            const btn = event.currentTarget;
            const originalText = btn.innerHTML;
            btn.innerHTML = "✓ У кошику";
            btn.style.background = "#28a745";
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = ""; // reset to css default
            }, 1000);
        }

        function updateCartUI() {

            document.querySelector('.cart-count').innerText = cart.length;
            
            
            const container = document.getElementById('cart-items-container');
            const totalEl = document.getElementById('cart-total');
            
            if (cart.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: var(--gray); margin-top: 20px;">Кошик порожній</p>';
                totalEl.innerText = '0';
                return;
            }

            container.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                total += item.price;
                container.innerHTML += `
                    <div class="cart-item">
                        <div>
                            <strong>${item.title}</strong><br>
                            <span style="font-size: 0.9rem; color: #777;">${item.price} ₴</span>
                        </div>
                        <button onclick="removeFromCart(${index})" style="color: red; background: none; border: none; cursor: pointer;">Видалити</button>
                    </div>
                `;
            });

            totalEl.innerText = total;
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartUI();
        }

        function toggleCart() {
            const modal = document.getElementById('cart-modal');
            modal.classList.toggle('open');
        }


        document.getElementById('cart-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                toggleCart();
            }
        });

        function processOrder(e) {
            e.preventDefault();
            if(cart.length === 0) {
                alert("Ваш кошик порожній!");
                return;
            }
            alert(`Дякуємо! Ваше замовлення на суму ${document.getElementById('cart-total').innerText} ₴ прийнято.`);
            cart = [];
            updateCartUI();
            toggleCart();
        }


        renderProducts();
