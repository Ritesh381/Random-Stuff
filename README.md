# Random Stuff Website

Welcome to the **Random Stuff** website! This platform is your one-stop destination for discovering and sharing the quirkiest, funniest, or most useful "things" on the internet. Whether you have a wacky invention to showcase or are looking for a chuckle-worthy product, this is the place for you.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

## About the Project

This website allows users to upload and browse products (referred to as "things" for fun). Users can:

- Sign up and log in to access the platform.
- Add products with a title, description, visual, funny use case, and a link for further exploration.
- Browse and search for products added by others.
- Manage their added products via the dashboard.
- Stay logged in even after closing the website until they manually log out.

The website is now fully backed by **Supabase**, enabling global storage and accessibility of all added products.

## Features

1. **User Authentication:**

   - Sign up and log in to add products (powered by **Supabase**).
   - Persistent login ensures users stay logged in until they manually log out.
   - Secure authentication flow to manage user data.

2. **Add Your Thing:**

   - Upload a product (or "thing") with:
     - Title
     - Description
     - Funny use case
     - Tags for searchability
     - Image and product link

3. **Find a Thing:**

   - Search for items using keywords.
   - Randomly browse items using the "spawn" feature.
   - Click on the rocket icon for more information of the thing.
   - Click the title of any product to get a detailed view of the thing.
   - Navigate through products using the next and prev buttons.

4. **Dashboard:**

   - View all products added by the logged-in user.
   - Edit or delete any product they have added.
   - Log out feature to securely exit the session.

5. **Global Storage:**

   - All products are stored online using **Supabase**, making them accessible to all users.
   - No more reliance on local storage—anyone can see everyone's posts.

## Screenshots

&#x20;   &#x20;

## Technologies Used

- **Frontend:**

  - HTML5
  - CSS3
  - JavaScript

- **Backend & Database:**

  - Supabase (Authentication & Data Storage)

- **Icons:**

  - FontAwesome

## Getting Started

To get started with this project locally:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project folder:

   ```bash
   cd random-stuff-website
   ```

3. Open `index.html` in your browser to explore the site.

## Future Improvements

- **Advanced Search Filters:**

  - Implement filtering options based on tags, categories, or funny use cases.

- **Product Reviews & Ratings:**

  - Allow users to rate and review products.

- **Enhanced User Profiles:**

  - Introduce profile customization and user badges for contributions.

## Contributing

Contributions are welcome! Feel free to fork the project and submit a pull request with your improvements.

---

### Have Fun Exploring Random Stuff!

