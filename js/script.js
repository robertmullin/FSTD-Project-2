/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
  // create two variables that will represent the index for the first and last student on the page
  let cardsPerPage = 9;
  let startIndex = page * cardsPerPage - cardsPerPage;
  let endIndex = Math.min(page * cardsPerPage, list.length);
  
  // select the element with a class of `student-list` and assign it to a variable
  let studentList = document.querySelector(".student-list");
  
  // set the innerHTML property of the variable you just created to an empty string
  studentList.innerHTML = "";
  
  // loop over the length of the `list` parameter
  for (let i = startIndex; i < endIndex && i < list.length; i++) {
    // create the elements needed to display the student information
    let student = list[i];
    let listItem = document.createElement("li");
    listItem.className = "student-item";
    listItem.innerHTML = `
      <div class="student-details">
        <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
        <h3>${student.name.title} ${student.name.first} ${student.name.last}</h3>
        <span class="email">${student.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${student.registered.date}</span>
      </div>
    `;
    // insert the above elements
    studentList.appendChild(listItem);
    console.log(list[i]);
  }

  // Check if there are no students to display
  if (startIndex >= list.length) {
    console.log("No student to display.");
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  // create a variable to calculate the number of pages needed
  let cardsPerPage = 9;
  let numOfPages = Math.ceil(list.length / cardsPerPage);
  // select the element with a class of `link-list` and assign it to a variable
  let linkList = document.querySelector(".link-list");
  // set the innerHTML property of the variable you just created to an empty string
  linkList.innerHTML = "";
  // loop over the number of pages needed
  for (let i = 1; i <= numOfPages; i++) {
    // create the elements needed to display the pagination button
    let button = `<li><button type="button">${i}</button></li>`;
    // insert the above elements
    linkList.insertAdjacentHTML("beforeend", `<li>${button}</li>`);
  }
  // give the first pagination button a class of "active"
  linkList.querySelector("button").classList.add("active");
  // add event listener to linkList
  linkList.addEventListener("click", function (e) {
    // check if the clicked element is a BUTTON
    if (e.target.tagName === "BUTTON") {
      // remove active class from previous button
      linkList.querySelector(".active").classList.remove("active");
      // add active class to clicked button
      e.target.classList.add("active");
      // call showPage function with list and page number as arguments
      showPage(list, parseInt(e.target.textContent));
    }
  });
}

// create a function to define the search bar and set the argument to where the list of student objects is
function searchBar(data) {
  //create the search field and store it in a variable 
  const searchField = `
    <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
  `;
  // select the header element and insert the search field
  const header = document.querySelector('.header');
  header.insertAdjacentHTML('beforeend', searchField);
  // grab the elements needed for input and the event listener and store them in variables 
  const searchInput = document.getElementById('search');
  const searchButton = document.querySelector('.student-search button');

  // grab the value of the search field
  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    // filter the data
    // NOTE: there is probably a more efficient way to do this but for the scope of this project this is okay
    const filteredList = data.filter(function(student) {
      // store both first and last name in one variable
      const fullName = student.name.first + ' ' + student.name.last;
      const fullNameToLowercase = fullName.toLowerCase();
      return fullNameToLowercase.includes(searchTerm);
    });
    // display the students with the modified data
    addPagination(filteredList);
    showPage(filteredList, 1);
  });
}

// Call functions
addPagination(data);
showPage(data, 1);
searchBar(data);