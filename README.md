# findYourMeal

App for finding a dish by selecting ingredients it contains. It shows only the dishes that have ALL the selected ingredients in common. It's dynamically updated by user input.

You can add custom dishes to 5 dishes that i put in the app by default. Fill the form shown by clicking ADD MEAL at the bottom of the page, click add and the dish and recipe for it is added to the roster. It's also added to your local storage so after reloading the page it won't disappear. Recipe and name is required for sending the form, also the name must be unique. If any of this requirements isn't met an alert will pop up and nothing will be updated.

Ingredients and names of the dishes are always kept unique, so if you won't misspell some words there won't be any repetition.

When the name of the dish is clicked a modal with dynamically filled recipe is shown. Modal text content is filled with recipe text but with keywords corresponding to ingredient types switched to ingredients of that type contained in that dish's object AND selected, e.g. keyword 'other' in goulash recipe will be switched to 'tomato concentrate' if it has been selected on the left of the page. Of course it also works with newly added dishes.

There are no additional libraries or frameworks used, just pure JS, CSS and HTML.

Most of the elements are responsive to window size. Placing of the html elements is done by css grid and a little bit of flexbox.

Available online under https://distracted-jang-64cbf0.netlify.app/
