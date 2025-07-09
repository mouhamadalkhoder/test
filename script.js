const barcodeInput = document.getElementById("barcodeInput");
const searchBtn = document.getElementById("searchBtn");

const productDetails = document.getElementById("productDetails");
const productName = document.getElementById("productName");
const productImage = document.getElementById("productImage");
const productPrice = document.getElementById("productPrice");
const productColors = document.getElementById("productColors");
const productSizes = document.getElementById("productSizes");
const similarProductsList = document.getElementById("similarProductsList");

let products = [];

function renderProduct(product) {
  productName.textContent = product.name;
  productImage.src = product.image || "";
  productPrice.textContent = product.price.toFixed(2);
productColors.innerHTML = ""; // Clear old buttons
product.colors.forEach(color => {
  const btn = document.createElement("button");
  btn.className = "color-button";
  btn.style.backgroundColor = color;

  btn.title = color; // Tooltip
btn.addEventListener("click", () => {
  // إزالة التحديد عن باقي الألوان
  document.querySelectorAll(".color-button").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  // عرض صورة اللون إذا موجودة
  const imgSrc = product.images_by_color?.[color];
  if (imgSrc) {
    productImage.src = imgSrc;
  }
});

  
  productColors.appendChild(btn);
});

  productSizes.textContent = product.sizes.join(", ");

  // similar products
  similarProductsList.innerHTML = "";
  product.similar_products.forEach(simBarcode => {
    const simProd = products.find(p => p.barcode === simBarcode);
    if (simProd) {
      const li = document.createElement("li");
      li.textContent = `${simProd.name} - ألوان: ${simProd.colors.join(", ")}, أحجام: ${simProd.sizes.join(", ")}`;
      li.classList.add("clickable-similar");
      li.addEventListener("click", () => renderProduct(simProd));
      similarProductsList.appendChild(li);
    }
  });

  productDetails.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {
  const barcode = barcodeInput.value.trim();
  if (!barcode) {
    alert("يرجى إدخال barcode");
    return;
  }

  const product = products.find(p => p.barcode === barcode);
  if (!product) {
    alert("المنتج غير موجود");
    productDetails.classList.add("hidden");
    return;
  }

  renderProduct(product);
});

// تحميل المنتجات من JSON
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data.products;
  })
  .catch(error => {
    console.error("خطأ في تحميل بيانات المنتجات:", error);
  });
  // عرض صورة اللون الأول كافتراضي
const firstColor = product.colors[0];
const defaultImg = product.images_by_color?.[firstColor];
if (defaultImg) {
  productImage.src = defaultImg;
} else {
  productImage.src = "https://ashta.shop/wp-content/uploads/2025/04/image00031-5-scaled.jpeg";
}
product.colors.forEach(color => {
  const btn = document.createElement("button");
  btn.className = "color-button";
  btn.style.backgroundColor = color;
  btn.title = color;

  btn.addEventListener("click", () => {
    document.querySelectorAll(".color-button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    const imgSrc = product.images_by_color?.[color];
    if (imgSrc) {
      productImage.src = imgSrc;
    }
  });

  const label = document.createElement("div");
  label.textContent = color;

  const wrapper = document.createElement("div");
  wrapper.className = "color-wrapper";
  wrapper.appendChild(btn);
  wrapper.appendChild(label);

  productColors.appendChild(wrapper);
});
