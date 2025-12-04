const myLibrary = [];

function Book(author, title, numPages, read) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
}

function addBookTolibrary(author, title, numPages, read) {
    let book = new Book(author, title, numPages, read);
    myLibrary.push(book);
}

function clearContent(){
    let contentArea=document.getElementById("main_content");
    while(contentArea.firstChild){
        contentArea.removeChild(contentArea.firstChild);
    }
}
function removeBook(index){
    delete(myLibrary[index]);
    let newLibrary=[];
    for(let i=0;i<myLibrary.length;++i){
        if(myLibrary[i]!=null){
           newLibrary.push(myLibrary[i]);
        }
    }
    myLibrary.pop();
    for(let i=0;i<newLibrary.length;++i){
        myLibrary[i]=newLibrary[i];
    }
    console.log("book removed");
    clearContent();
    displayBooks();
}
function readBook(index){
    if(myLibrary[index].read==="UNREAD"){
        myLibrary[index].read="READ";
        
    }
    else{
        myLibrary[index].read="UNREAD";
    }
    clearContent();
    displayBooks();
}
function displayBooks(){
    let mainContent = document.getElementById("main_content");
    

    for (let i = 0; i < myLibrary.length; ++i) {
        
        
        let bookContainer = document.createElement("div");
        bookContainer.setAttribute("class","book");
       /*bookContainer.setAttribute("id", id);*/
        let bookLeft=document.createElement("div");
        bookLeft.setAttribute("class", "bookLeft");
        let bookLeftTitle=document.createElement("div");
        let bookLeftAuthor=document.createElement("div");
        let bookLeftPages=document.createElement("div");

        let readButton=document.createElement("button");
        let removeButton=document.createElement("button");
        readButton.innerText="Read";

        removeButton.innerText="Remove";
        removeButton.onclick= function () {removeBook(i)};

        readButton.onclick=function () {readBook(i)};

        bookLeftTitle.innerHTML="Title:";
        bookLeftAuthor.innerHTML="Author:";
        bookLeftPages.innerHTML="Pages:";
        bookLeft.appendChild(bookLeftTitle);
        bookLeft.appendChild(bookLeftAuthor);
        bookLeft.appendChild(bookLeftPages);
        bookLeft.appendChild(readButton);
        bookLeft.appendChild(removeButton);

       
        bookContainer.appendChild(bookLeft);



        let bookRight=document.createElement("div");
        bookRight.setAttribute("class", "bookRight");
        let bookRightTitle=document.createElement("div");
        let bookRightAuthor=document.createElement("div");
        let bookRightPages=document.createElement("div");
        let bookRightStatus=document.createElement("div");
        bookRightStatus.setAttribute("class", myLibrary[i].read);

        
        bookRightTitle.innerHTML=myLibrary[i].title;
        bookRightAuthor.innerHTML=myLibrary[i].author;
        bookRightPages.innerHTML=myLibrary[i].numPages;
        bookRightStatus.innerHTML=myLibrary[i].read;

        bookRight.appendChild(bookRightTitle);
        bookRight.appendChild(bookRightAuthor);
        bookRight.appendChild(bookRightPages);
        bookRight.appendChild(bookRightStatus);

        bookContainer.appendChild(bookRight);

        mainContent.appendChild(bookContainer);
        
}
}
function init() {

    addBookTolibrary("Yeomi Park", "In Order To live", 267, "UNREAD");
    addBookTolibrary("Kentaru Miura", "Berserk", 2000, "READ");
    addBookTolibrary("Genna Rose Nethercroft", "Thistlefoot", 200, "UNREAD");
    addBookTolibrary("Greg Bear", "Queen Of Angels", 274, "UNREAD");
    addBookTolibrary("David Grann", "The Lost City Of Z", 320, "UNREAD");
    addBookTolibrary("Ben Macyntire", "The Spy And The Traitor", 430, "UNREAD");

  
 
displayBooks();
        const dialogElem = document.getElementById("dialog");
        const showBtn = document.querySelector(".show");
        const closeBtn = document.querySelector(".close");
        const form = dialogElem.querySelector("form")
        
        showBtn.addEventListener("click", () => {
          dialogElem.showModal();
        });
        
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (form && form.checkValidity())
            {
                let input=dialogElem.querySelectorAll("input");
                addBookTolibrary(input[0].value,input[1].value,input[2].value, "UNREAD");
                clearContent();
       
                dialogElem.close(input.value);
                displayBooks();
            }
            else
            {
                alert("Please fill out required fields.")
            }
        });

        

    
}


