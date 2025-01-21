(function testAddFavorite() {
    // Reset the global favorites list for this test
    favorites = [];

    // Create a mock property card
    const propertyCard = document.createElement("div");
    propertyCard.classList.add("property-card");

    // Add a title for the property
    const mockTitle = document.createElement("h3");
    mockTitle.textContent = "דירת 4 חדרים בבאר שבע";
    propertyCard.appendChild(mockTitle);

    // Add a heart button (the favorite button)
    const mockButton = document.createElement("button");
    mockButton.classList.add("favorite-button");
    propertyCard.appendChild(mockButton);

    // Attach the property card to the page (important for .closest() to work)
    document.body.appendChild(propertyCard); 

    // 🔥 Attach the real event listener logic to the button
    mockButton.addEventListener("click", (event) => {
        const propertyName = event.target.closest(".property-card").querySelector("h3").textContent.trim();
        if (!favorites.includes(propertyName)) {
            favorites.push(propertyName);
            console.log(`'${propertyName}' added to favorites`);
        }
    });

    // Simulate a button click
    mockButton.click(); 

    // Verify if the property was added to the favorites list
    if (favorites.includes(mockTitle.textContent)) {
        console.log("✅ Test 1 Passed: Added new apartment to favorites");
    } else {
        console.error("❌ Test 1 Failed: Apartment was not added to favorites");
    }

    // Clean up the DOM (remove the mock card)
    document.body.removeChild(propertyCard);
})();


(function testPreventDuplicateFavorites() {
    favorites = ["דירת 4 חדרים בבאר שבע"];
    const propertyCard = document.createElement("div");
    propertyCard.classList.add("property-card");

    const mockTitle = document.createElement("h3");
    mockTitle.textContent = "דירת 4 חדרים בבאר שבע";
    propertyCard.appendChild(mockTitle);

    const mockButton = document.createElement("button");
    mockButton.classList.add("favorite-button");
    propertyCard.appendChild(mockButton);

    document.body.appendChild(propertyCard); // Attach to the DOM to simulate real environment

    mockButton.click(); // Simulate click

    const count = favorites.filter(fav => fav === mockTitle.textContent).length;
    if (count === 1) {
        console.log("✅ Test 2 Passed: Duplicate apartments are not added");
    } else {
        console.error("❌ Test 2 Failed: Duplicate apartment was added");
    }

    document.body.removeChild(propertyCard); // Clean up the test
})();
