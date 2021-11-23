/* 
1. createElemWithText
a. Receives up to 3 parameters
b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
c. Set a default value for the 1st parameter to “p”
d. 2nd parameter is the textContent of the element to be created
e. Default value of the 2nd parameter is “”
f. 3rd parameter is a className if one is to be applied (optional)
g. Use document.createElement() to create the requested HTML element
h. Set the other desired element attributes.
i. Return the created element
*/

const createElemWithText = (element = "p", content = "", className) =>
{
    const newElement = document.createElement(element);
    newElement.textContent = content;

    className != null ? newElement.classList.add(className) : null

    document.body.appendChild(newElement);

    return newElement;
}

/*
2. createSelectOptions
a. Test users JSON data available here: https://jsonplaceholder.typicode.com/users 
b. For testing (not in function) you may want to define users with the test data. 
c. Receives users JSON data as a parameter 
d. Returns undefined if no parameter received 
e. Loops through the users data 
f. Creates an option element for each user with document.createElement() 
g. Assigns the user.id to the option.value 
h. Assigns the user.name to the option.textContent 
i. Return an array of options elements
*/

const createSelectOptions = (usersJsonData) =>
{
    if (!usersJsonData) return;
    const arr = [];

    usersJsonData.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        arr.push(option);        
    });
      
    return arr;
}

/*
3. toggleCommentSection
a. Receives a postId as the parameter 
b. Selects the section element with the data-post-id attribute equal to the postId 
received as a parameter 
c. Use code to verify the section exists before attempting to access the classList
property
d. At this point in your code, the section will not exist. You can create one to test if
desired.
e. Toggles the class 'hide' on the section element
f. Return the section element
*/

const toggleCommentSection = (postId) =>
{
    if (!postId) return;

    const sectionElement = document.querySelector(`section[data-post-id='${postId}']`);

    if(!sectionElement?.tagName) return null;

    sectionElement.classList.toggle("hide")

    return sectionElement;
}

/*
4. toggleCommentButton
a. Receives a postId as the parameter
b. Selects the button with the data-post-id attribute equal to the postId received as a
parameter
c. If the button textContent is 'Show Comments' switch textContent to 'Hide
Comments'
d. If the button textContent is 'Hide Comments' switch textContent to 'Show
Comments'
e. Suggestion (not required) for above: try a ternary statement
f. Return the button element
*/

const toggleCommentButton = (postId) =>
{
    if (!postId) return;

    const buttonElement = document.querySelector(`button[data-post-id='${postId}']`);

    if(!buttonElement?.tagName) return null;

    buttonElement.textContent === "Show Comments" ? buttonElement.textContent = "Hide Comments" : buttonElement.textContent = "Show Comments";

    return buttonElement;
}

/*
5. deleteChildElements
a. Receives a parentElement as a parameter
b. Define a child variable as parentElement.lastElementChild
c. While the child exists…(use a while loop)
d. Use parentElement.removeChild to remove the child in the loop
e. Reassign child to parentElement.lastElementChild in the loop
f. Return the parentElement
*/
const deleteChildElements = (parentElement) =>
{
    if (!parentElement) return;

    if(!parentElement?.tagName) return;

    let childElement = parentElement.lastElementChild;

    while (childElement)
    {
        parentElement.removeChild(childElement);
        childElement = parentElement.lastElementChild;
    }
    return parentElement;
}

/*
6. addButtonListeners
a. Selects all buttons nested inside the main element
b. If buttons exist:
c. Loop through the NodeList of buttons
d. Gets the postId from button.dataset.postId
e. Adds a click event listener to each button (reference addEventListener)
f. The listener calls an anonymous function (see cheatsheet)
g. Inside the anonymous function: the function toggleComments is called with the
event and postId as parameters
h. Return the button elements which were selected
i. You may want to define an empty toggleComments function for now. Not all tests
will pass for addButtonListeners until toggleComments exists. I recommend
waiting on the logic inside the toggleComments function until we get there.
*/