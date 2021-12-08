const createElemWithText = (element = "p", content = "", className) =>
{
    let newElement = document.createElement(element);
    newElement.textContent = content;

    className != null ? newElement.classList.add(className) : null

    document.body.appendChild(newElement);

    return newElement;
}

const createSelectOptions = (usersJsonData) =>
{
    if (!usersJsonData) return;
    const arr = [];

    for (const user of usersJsonData)
    {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        arr.push(option);        
    }
    
    return arr;
}

const toggleCommentSection = (postId) =>
{
    if (!postId) return;

    const sectionElement = document.querySelector(`section[data-post-id='${postId}']`);

    if(!sectionElement?.tagName) return null;

    sectionElement.classList.toggle("hide")

    return sectionElement;
}

const toggleCommentButton = (postId) =>
{
    if (!postId) return;

    const buttonElement = document.querySelector(`button[data-post-id='${postId}']`);

    if(!buttonElement?.tagName) return null;

    buttonElement.textContent === "Show Comments" ? buttonElement.textContent = "Hide Comments" : buttonElement.textContent = "Show Comments";

    return buttonElement;
}

const deleteChildElements = (parentElement) =>
{
    if(!parentElement?.tagName) return;

    let childElement = parentElement.lastElementChild;

    while (childElement)
    {
        parentElement.removeChild(childElement);
        childElement = parentElement.lastElementChild;
    }

    return parentElement;
}

const addButtonListeners = () =>
{
    const mainElement = document.querySelector("main");
    const allButtons = mainElement.querySelectorAll("button");

    if (allButtons)
    {
        for (const button of allButtons)
        {
            const postId = button.dataset.postId;
            button.addEventListener("click", (e) => {
                toggleComments(e, postId);
            });
        }
    }

    return allButtons;
}

const removeButtonListeners = () =>
{
    const mainElement = document.querySelector("main");
    const allButtons = mainElement.querySelectorAll("button");

    if (allButtons)
    {
        for (const button of allButtons)
        {
            const postId = button.dataset.postId;

            button.removeEventListener("click", (e) => {
                toggleComments(e, postId);
            });
        }
    }

    return allButtons;
}

const createComments = (jsonCommentsData) =>
{
    if (!jsonCommentsData) return;

    let docFragment = document.createDocumentFragment();

    for (const comment of jsonCommentsData)
    {
        let articleElem = document.createElement("article");

        const header = createElemWithText("h3", comment.name);
        const body = createElemWithText("p", comment.body);
        const byline = createElemWithText("p", `From: ${comment.email}`);

        articleElem.append(header, body, byline);
        docFragment.append(articleElem);
    }

    return docFragment;
}

const populateSelectMenu = (jsonUsersData) =>
{
    if (!jsonUsersData) return;

    let selectMenu = document.querySelector("#selectMenu");
    const optionElements = createSelectOptions(jsonUsersData);

    for (const optionElement of optionElements)
    {
        selectMenu.append(optionElement);
    }

    return selectMenu;
}

const getUsers = async () => 
{
    try 
    {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        return await response.json();
    } 
    catch (error) 
    {
        console.error(error);
    }
}

const getUserPosts = async (userId) => 
{
    if (!userId) return;

    try 
    {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        return await response.json();
    } 
    catch (error) 
    {
        console.error(error);
    }
}

const getUser = async (userId) => 
{
    if (!userId) return;

    try 
    {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return await response.json();
    } 
    catch (error) 
    {
        console.error(error);
    }
}

const getPostComments = async (postId) =>
{
    if (!postId) return;

    try 
    {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        return await response.json();
    } 
    catch (error) 
    {
        console.error(error);
    }
}

const displayComments = async (postId) =>
{
    if (!postId) return;

    let sectionElement = document.createElement("section");
    sectionElement.dataset.postId = postId;

    sectionElement.classList.add("comments","hide");

    let comments = await getPostComments(postId);
    const fragment = createComments(comments);

    sectionElement.append(fragment);

    return sectionElement;  
}

const createPosts = async (jsonPostsData) =>
{
    if (!jsonPostsData) return;

    let docFragment = document.createDocumentFragment();

    for (const post of jsonPostsData)
    {
        let articleElem = document.createElement("article");

        const title = createElemWithText("h2", post.title);
        const body = createElemWithText("p", post.body);
        const postId = createElemWithText("p", `Post ID: ${post.id}`);
        const author = await getUser(post.userId);
        const byline = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
        const catchPhrase = createElemWithText("p", `${author.company.catchPhrase}`);
        const button = createElemWithText("button", "Show Comments");
        button.dataset.postId = post.id;

        articleElem.append(title, body, postId, author, byline, catchPhrase, button);

        const section = await displayComments(post.id);

        articleElem.append(section);
        docFragment.append(articleElem);
    }

    return docFragment;
}

const displayPosts = async (jsonPostsData) =>
{   
    const mainElement = document.querySelector("main");
    let defaultTextContent = "Select an Employee to display their posts.";
    let element;

    jsonPostsData?.length ? element = await createPosts(jsonPostsData) : element = createElemWithText("p", defaultTextContent, "default-text");
    mainElement.append(element);

    return element;
}

const toggleComments = (event, postId) => 
{
    if (!event && !postId) return;

    event.target.listener = true;
    const sectionElement = toggleCommentSection(postId);
    const buttonElement = toggleCommentButton(postId);

    return [sectionElement, buttonElement];
}

const refreshPosts = async (jsonPostsData) =>
{
    if (!jsonPostsData) return;

    const removeButtons = removeButtonListeners(); 
    const main = deleteChildElements(document.querySelector("main"));
    const fragment = await displayPosts(jsonPostsData); 
    const addButtons = addButtonListeners();

    return [removeButtons, main, fragment, addButtons];
}

const selectMenuChangeEventHandler = async (event) =>
{    
    const userId = event?.target?.value || 1;
    const postsData = await getUserPosts(userId);
    const refreshPostsArray = await refreshPosts(postsData);

    return [userId, postsData, refreshPostsArray];
}

const initPage = async () =>
{
    const usersJsonData = await getUsers();
    const selectElement = populateSelectMenu(usersJsonData);

    return [usersJsonData, selectElement];
}

const initApp = () =>
{
    initPage();
    const selectMenu = document.querySelector("#selectMenu");
    selectMenu.addEventListener("change", selectMenuChangeEventHandler);
}

document.addEventListener("DOMContentLoaded", initApp);