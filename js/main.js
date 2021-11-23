/* 
createElemWithText
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
createSelectOptions
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
toggleCommentSection
a. Receives a postId as the parameter x
b. Selects the section element with the data-post-id attribute equal to the postId 
received as a parameter x
c. Use code to verify the section exists before attempting to access the classList
property
d. At this point in your code, the section will not exist. You can create one to test if
desired.x
e. Toggles the class 'hide' on the section elementx
f. Return the section elementx
*/

const toggleCommentSection = (postId) =>
{
    if (!postId) return;

    const sectionElement = document.querySelector(`section[data-post-id='${postId}']`);

    if(!sectionElement?.tagName) return null;

    sectionElement.classList.toggle("hide")

    return sectionElement;
}