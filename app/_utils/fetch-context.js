async function fetchBooks(searchTerm, searchType) {
    // searchTerm needs to be in the form of a string with + replacing spaces
  if (searchTerm === "") {
    return null;
  }
  if (searchType === "title") {
    const response = await fetch(
        `https://openlibrary.org/search.json?title=${searchTerm}`
      );
      const data = await response.json();
      return data; // This will be a an object with "start": , "num_found": , "docs": [{ }] link: https://openlibrary.org/dev/docs/api/search
  }
  if (searchType === "author") {
    const response = await fetch(
        `https://openlibrary.org/search.json?author=${searchTerm}`
      );
      const data = await response.json();
      return data;
  }
}
// book covers can be accessed using the cover id in an images src
// <img src="https://covers.openlibrary.org/b/$key/$value-$size.jpg" />
// 


async function fetchIngredients(id) {
  if (id === "") {
    return null;
  }
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  const ingredientsList = [];
  for (let i = 1; i <= 20; i++) {
    if (
      data.meals[0][`strMeasure${i}`] === "" ||
      data.meals[0][`strMeasure${i}`] === null
    ) {
      break;
    }
    if (
      data.meals[0][`strIngredient${i}`] === "" ||
      data.meals[0][`strIngredient${i}`] === null
    ) {
      break;
    }
    ingredientsList.push(
      data.meals[0][`strMeasure${i}`] +
        "  –  " +
        data.meals[0][`strIngredient${i}`]
    );
  }
  return ingredientsList;
}
