# Test Plan - Playwright Bookstore

## 1. Test Objectives

The objective of this test plan is to ensure that the Playwright Bookstore application functions correctly by:
- Verifying critical user workflows.
- Maintaining application stability.
- Identifying potential defects before deployment.

## 2. Test Scope

This test plan covers end-to-end testing of key bookstore functionalities in the Playwright Bookstore repository. The tests will focus on:
- Functional testing.
- UI testing.
- Automation using JavaScript and Playwright.

## 3. High-Level Test Cases

### 3.1 Book Listing 
- Displays a list of books with titles and prices (BookListing.spec.js)
- Allows book filtering by keywords (Basic search) (BookListing.spec.js)
- Allows sorting books by price (ascending and descending) (BookListing.spec.js)

### 3.2 Book Details
- Clicking on a book in the list leads to a detailed book page  (BookDetails.spec.js)
- The detailed page displays the books title, price, and description  (BookDetails.spec.js)

### 3.3 User Registration And Login
- Users can register with valid credentials (BookSignUp.spec.js)
- Users can log in with registered credentials (BookSignIn.spec.js)
- Users can check previous orders (BookProfile.spec.js)
- Users can log out (BookProfile.spec.js)

### 3.4 Shopping Cart
- Adding books to the shopping cart (PageBoookShoppingCart.js)
- Viewing the shopping cart (PageBoookShoppingCart.js)
- Checkout process (PageBoookShoppingCart.js)


## 4. Tools and Frameworks
- **Test Framework**: Playwright
- **Programming Language**: JavaScript
- **Test Runner**: Playwright Test Runner
- **Repository**: [Playwright Bookstore Repository](https://github.com/PeterLukic/PlaywrightBookstore)

## 5. Test Environment
- **Browser**: Chromium, FireFox, Microsoft Edge
- **Operating System**: Windows 10,Mac OS, Linux
- **Test Data**: Sample book data provided in `dataBookStore.json`.

## 6. Test Execution
- Tests will be executed automatically using Playwright scripts.
- Results will be logged and reviewed for any failures or defects.

## 7. Run Tests 
- Run all test: npx playwright test

* Run Specific Test:
- Displays a list of books with titles and prices : npx playwright test --grep "@BookListingDisplay"
- Allows book filtering by keywords (Basic search) : npx playwright test --grep "@BookSearch"
- Allows sorting books by price (ascending and descending) : npx playwright test --grep "@BookSorting"
- Clicking on a book in the list leads to a detailed book page : npx playwright test --grep "@BookClick"
- The detailed page displays the books title, price, and description : npx playwright test --grep "@BookDisplay"
- Users can register with valid credentials :  npx playwright test --grep "@UserRegister"
- Users can log in with registered credentials : npx playwright test --grep "@UserLoginRegister"
- Users can check previous orders :  npx playwright test --grep "@CheckOrders"
- Users can log out : npx playwright test --grep "@LogOut"
- Adding books to the shopping cart : npx playwright test --grep "@AddBook"
- Viewing the shopping cart : npx playwright test --grep "@ShopCard"
- Checkout process : npx playwright test --grep "@Checkout"

## 8. Test Deliverables
- Test scripts in the repository.

## 9. Install (Maybe you will need to do this)
- Clone the Repository : git clone https://github.com/PeterLukic/PlaywrightBookstore.git
- Navigate to the Directory : cd PlaywrightBookstore
- Install Dependencies : npm install
- Install Playwright Browsers : npx playwright install

