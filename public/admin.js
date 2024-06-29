// Your Code Here
async function retrieveBooks() {
    let response = await fetch("http://localhost:3001/listBooks");
    let books = await response.json();
  
    books.forEach(renderBookList);
  }
  
  //Targets the html div with id#root and creates a list item for each book.
  //Also creates three inputs: one input for quanity of books, another to submit and another to delete.
  function renderBookList(book) {
    let div = document.getElementById("root");
  
    let li = document.createElement("li");
    li.textContent = book.title;
  
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.value = book.quantity;
  
    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Save");
  
    //Updates the book list with the input quantity when the submit button is clicked.
    submit.addEventListener("click", async () => {
      let response = await fetch("http://localhost:3001/updateBook", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: book.id,
          quantity: input.value,
        }),
      });
  
      let updatedBookQuantity = await response.json();
      console.log(updatedBookQuantity);
    });
  
    let deleteInput = document.createElement("input");
    deleteInput.setAttribute("type", "submit");
    deleteInput.setAttribute("value", "Delete");
  
    // Deletes the book when clicked, warning the user first with a popup (achieved by using the window confirm() method)
    deleteInput.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this book?")) {
        let response = await fetch(
          `http://localhost:3001/removeBook/${book.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        let deletedBook = await response.json();
        console.log(deletedBook);
      }
    });
  
    //Inserts the list items into the div.
    div.append(li);
    //Inserts the input fields, submit and delete buttons next to the list items.
    li.append(input, submit, deleteInput);
  }
  
  //Creates a form for the user to add a new book to the list.
  function newBookForm() {
    let div = document.getElementById("book-form-container");
  
    let formTitle = document.createElement("h2");
    formTitle.textContent = "Add a Book";
  
    let form = document.createElement("form");
    form.setAttribute("method", "post");
  
    let titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title of Book:";
  
    let titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
  
    let descLabel = document.createElement("label");
    descLabel.setAttribute("for", "description");
    descLabel.textContent = "Description of Book:";
  
    let descInput = document.createElement("input");
    descInput.setAttribute("type", "text");
    descInput.setAttribute("id", "description");
    descInput.setAttribute("name", "description");
  
    let quantityLabel = document.createElement("label");
    quantityLabel.setAttribute("for", "quantity");
    quantityLabel.textContent = "Quantity of Book:";
  
    let quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("id", "quantity");
    quantityInput.setAttribute("name", "quantity");
  
    let imgLabel = document.createElement("label");
    imgLabel.setAttribute("for", "img-url");
    imgLabel.textContent = "Image URL of Book:";
  
    let imgInput = document.createElement("input");
    imgInput.setAttribute("type", "text");
    imgInput.setAttribute("id", "img-url");
    imgInput.setAttribute("name", "img-url");
  
    let lineBreak1 = document.createElement("br");
    let lineBreak2 = document.createElement("br");
    let lineBreak3 = document.createElement("br");
    let lineBreak4 = document.createElement("br");
  
    let submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "Submit");
  
    let currentYear = new Date().getFullYear();
  
    // Adds the new book to the server based on the user input values.
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
        let response = await fetch("http://localhost:3001/addBook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleInput.value,
            quantity: quantityInput.value,
            description: descInput.value,
            imageURL: imgInput.value,
            year: currentYear,
          }),
        });
     
        let responseData = await response.json();
        console.log(responseData);
  
    });
  
    //Inserts the h2 and form to the specified div.
    div.append(formTitle, form);
    //Inserts the form labels, inputs and line breaks to the form.
    form.append(
      titleLabel,
      titleInput,
      lineBreak1,
      descLabel,
      descInput,
      lineBreak2,
      quantityLabel,
      quantityInput,
      lineBreak3,
      imgLabel,
      imgInput,
      lineBreak4,
      submitInput
    );
  }
  
  newBookForm();
  retrieveBooks();