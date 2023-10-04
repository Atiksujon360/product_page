document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.getElementById("addToCart");
  const successModal = document.getElementById("successModal");
  const closeModalButton = document.getElementById("closeModal");
  const sizeDropdown = document.getElementById("size");
  const colorDropdown = document.getElementById("color");

  // Function to update the availability of the "Add to Cart" button
  function updateAddToCartButton() {
    const selectedSize = sizeDropdown.value;
    const selectedOption = sizeDropdown.options[sizeDropdown.selectedIndex];
    const isSizeAvailable =
      selectedOption.getAttribute("data-available") === "true";

    addToCartButton.disabled = !isSizeAvailable;
    addToCartButton.style.backgroundColor = isSizeAvailable
      ? "#ff5733"
      : "#ccc";
  }

  addToCartButton.addEventListener("click", function () {
    const selectedSize = sizeDropdown.value;
    const selectedColor = colorDropdown.value;
    const selectedQuantity = document.getElementById("quantity").value;

    document.getElementById("selectedSize").textContent = selectedSize;
    document.getElementById("selectedColor").textContent = selectedColor;
    document.getElementById("selectedQuantity").textContent = selectedQuantity;

    successModal.style.display = "block";
  });

  closeModalButton.addEventListener("click", function () {
    successModal.style.display = "none";
  });
  // Function to update date and time in the footer
  function updateDateTime() {
    const currentDateTime = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const formattedDateTime = currentDateTime.toLocaleDateString(
      undefined,
      options
    );
    footerDateTimeElement.textContent = formattedDateTime;
  }
  // Slider and dots logic
  const slider = document.querySelector(".slider");
  const sliderImages = slider.querySelectorAll("img");
  const dotsContainer = document.querySelector(".dots");

  sliderImages.forEach((image, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      showImage(index);
    });
    dotsContainer.appendChild(dot);
  });

  let currentIndex = 0;

  function showImage(index) {
    if (index >= 0 && index < sliderImages.length) {
      slider.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
      updateDots();
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Initial price update
  function updatePrice() {
    const sizePrice = parseFloat(
      sizeDropdown.options[sizeDropdown.selectedIndex].getAttribute(
        "data-price"
      )
    );
    const colorPrice = parseFloat(
      colorDropdown.options[colorDropdown.selectedIndex].getAttribute(
        "data-price"
      )
    );
    const totalPrice = sizePrice + colorPrice;
    document.querySelector(
      ".product-price"
    ).textContent = `$${totalPrice.toFixed(2)}`;
  }

  sizeDropdown.addEventListener("change", function () {
    updatePrice();
    updateAddToCartButton();
  });

  colorDropdown.addEventListener("change", function () {
    updatePrice();
  });

  // Initial update of the "Add to Cart" button
  updateAddToCartButton();
  updatePrice();
  updateDateTime();
});
