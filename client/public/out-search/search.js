document.addEventListener("DOMContentLoaded", () => {
    const searchPage = document.getElementById("search-page");
    const resultPage = document.getElementById("result-page");
    const form = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const searchResult = document.getElementById("search-result");
    const backButton = document.getElementById("back-button");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); 
      const query = searchInput.value.trim();
      if (!query) {
        alert("Please enter something to search!");
        return;
      }
  
      searchPage.style.display = "none";
      resultPage.style.display = "block";
  
      searchResult.textContent = `You searched for: "${query}"`;
    });
  
    backButton.addEventListener("click", () => {
      searchPage.style.display = "block";
      resultPage.style.display = "none";
  
      searchInput.value = "";
    });
  });
  