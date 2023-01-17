import AbstractView from "./AbstractView.js";

const BookmarkCardHtml = `
<div class="bookmark-card">
    Bookmark
</div>
`

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Interest");
    }

    async getHtml() {
        return `
            <h1>Interests</h1>
            <p>You are viewing the interests!</p>
            <h3>Interest title</h3>
            ${BookmarkCardHtml}
        `;
    }
}