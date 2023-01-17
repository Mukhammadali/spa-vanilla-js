import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
        this.bookmarks = [];
    }

    onDelete(itemIndex){
        this.bookmarks = this.bookmarks.filter((_, index) => itemIndex !== index);

        this.injectBookmarksToCard(this.bookmarks);
    }

    injectBookmarksToCard(bookmarks) {
        const cardsListElement = document.getElementById("bookmark-card-list");
        cardsListElement.innerHTML = ""

        bookmarks.forEach((bookmark, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add("bookmark-card");

            cardElement.onclick = () => {
                this.onDelete(index);
            }

            cardElement.innerHTML = `
                <div>${bookmark.name}</div>
            `
            cardsListElement.appendChild(cardElement);
        })
    }

    async getEventListeners(){
        const buttonElement = document.getElementById("bookmark-btn")

        buttonElement.onclick = () => {
            this.bookmarks.push({
                id: 10,
                name: "My feed"
            })
            this.injectBookmarksToCard(this.bookmarks);
            console.log("bookmarks", this.bookmarks)
        }
    }

    async getHtml() {
        const response = await fetch('https://dummyjson.com/products')
        const data = await response.json();
        const products = data.products;
        const productsList = products.map(product => `
            <li>
                <h3>${product.title}</h3>
                <p>${product.description}</p>
            </li>
        `)
        
        return `
            <h1>Products</h1>
            <div id="bookmark-card-list">
            </div>
            <ul>
                <button id="bookmark-btn">Add to bookmark</button>
               ${productsList.join('')}
            </ul>
        `;
    }
}