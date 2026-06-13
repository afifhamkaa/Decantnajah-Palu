document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelector("#product-tabs");
  const grid = document.querySelector("#product-grid");
  const sizeTabs = document.querySelector("#size-tabs");

  if (!tabs || !grid) return;

  let activeCategory = "siang";
  let activeSize = "2ml";
  let allProducts = [];

  /**
   * Build WhatsApp order URL
   */
  const buildWALink = (product) => {
    const msg = encodeURIComponent(
      `Halo Decantnajah Palu! 👋\n\n` +
      `Saya ingin memesan:\n` +
      `📦 Produk: ${product.name}\n` +
      `🏷️ Brand: ${product.brand}\n` +
      `📂 Kategori: ${
        product.category === "siang"
          ? "Parfum Siang"
          : "Parfum Malam"
      }\n` +
      `📐 Ukuran: ${activeSize}\n` +
      `💰 Harga: ${product.harga[activeSize]}\n\n` +
      `Mohon konfirmasi ketersediaan produk.`
    );

    return `https://wa.me/6281234567890?text=${msg}`;
  };

  /**
   * Product Card
   */
  const createProductCard = (product) => {
    const card = document.createElement("article");
    card.className = "product-card";

   const imageWrap = document.createElement("div");
imageWrap.className = "product-image";

const image = document.createElement("img");

image.src = product.images[activeSize];
image.alt = product.name;
image.loading = "lazy";

imageWrap.appendChild(image);

    const body = document.createElement("div");
    body.className = "product-body";

    const categoryBadge = document.createElement("span");
    categoryBadge.className = "product-category";
    categoryBadge.textContent =
      product.category === "siang"
        ? "☀️ Parfum Siang"
        : "🌙 Parfum Malam";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const brand = document.createElement("p");
    brand.className = "product-brand";
    brand.textContent = product.brand;

    const desc = document.createElement("p");
    desc.className = "product-desc";
    desc.textContent = product.description;

    const pricing = document.createElement("div");
    pricing.className = "product-pricing";

    const row = document.createElement("div");
    row.className = "price-row";

    const sizeLabel = document.createElement("span");
    sizeLabel.className = "price-label";
    sizeLabel.textContent = activeSize;

    const priceValue = document.createElement("span");
    priceValue.className = "price-value";
    priceValue.textContent = product.harga[activeSize];

    row.appendChild(sizeLabel);
    row.appendChild(priceValue);

    pricing.appendChild(row);

    const orderBtn = document.createElement("a");
    orderBtn.className = "product-order-btn";
    orderBtn.href = buildWALink(product);
    orderBtn.target = "_blank";

    orderBtn.innerHTML =
      `<svg xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      Pesan via WhatsApp`;

    pricing.appendChild(orderBtn);

    body.appendChild(categoryBadge);
    body.appendChild(title);
    body.appendChild(brand);
    body.appendChild(desc);
    body.appendChild(pricing);

    card.appendChild(imageWrap);
    card.appendChild(body);

    return card;
  };

  /**
   * Render Produk
   */
  const renderFilteredProducts = () => {
    grid.innerHTML = "";

    const filtered = allProducts.filter(
      (product) => product.category === activeCategory
    );

    filtered.forEach((product) => {
      grid.appendChild(createProductCard(product));
    });
  };

  /**
   * Ganti kategori
   */
  const showCategory = (categoryId) => {
    activeCategory = categoryId;

    tabs
      .querySelectorAll("[data-category-button]")
      .forEach((btn) => {
        btn.classList.toggle(
          "active",
          btn.dataset.categoryButton === categoryId
        );
      });

    renderFilteredProducts();
  };

  /**
   * Render awal
   */
  const renderProducts = ({ categories, products }) => {
    allProducts = products;

    tabs.innerHTML = "";

    categories.forEach((cat) => {
      const btn = document.createElement("button");

      btn.type = "button";
      btn.dataset.categoryButton = cat.id;
      btn.textContent = cat.name;

      btn.addEventListener("click", () => {
        showCategory(cat.id);
      });

      tabs.appendChild(btn);
    });

    renderFilteredProducts();

    if (categories.length > 0) {
      showCategory(categories[0].id);
    }

    /**
     * Tombol ukuran
     */
    if (sizeTabs) {
      const sizeButtons =
        sizeTabs.querySelectorAll("button");

      sizeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          activeSize = btn.dataset.size;

          sizeButtons.forEach((b) =>
            b.classList.remove("active")
          );

          btn.classList.add("active");

          renderFilteredProducts();
        });
      });
    }
  };

  /**
   * Load JSON
   */
  fetch("./assets/product.json")
    .then((res) => {
      if (!res.ok)
        throw new Error("Gagal memuat data produk");
      return res.json();
    })
    .then(renderProducts)
    .catch(() => {
      grid.innerHTML =
        `<p class="product-empty">
          Data produk belum tersedia.
        </p>`;
    });
});