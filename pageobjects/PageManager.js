const { PageBooksList } = require('./PageBooksList');
const { PageBooksDetails } = require('./PageBooksDetails');
const { PageBooksSignUp } = require('./PageBooksSignUp');
const { PageBooksSignIn } = require('./PageBooksSignIn');
const { PageBooksProfile } = require('./PageBooksProfile');
const { PageBoookShoppingCart } = require('./PageBoookShoppingCart');
const { PageBooksCheckout } = require('./PageBooksCheckout');

class PageManager
{
    constructor(page)
    {
        this.page = page;
        this.pageBooksList = new PageBooksList(this.page);
        this.pageBooksDetails = new PageBooksDetails(this.page);
        this.pageBooksSignUp = new PageBooksSignUp(this.page);
        this.pageBooksSignIn = new PageBooksSignIn(this.page);
        this.pageBooksProfile = new PageBooksProfile(this.page);
        this.pageBoookShoppingCart = new PageBoookShoppingCart(this.page);
        this.pageBooksCheckout = new PageBooksCheckout(this.page);
    }

    getPageBooksList()
    {
        return this.pageBooksList;
    }

    getPageBooksDetails()
    {
        return this.pageBooksDetails;
    }

    getPageBooksSignUp()
    {
        return this.pageBooksSignUp;
    }

    getPageBooksSignIn()
    {
        return this.pageBooksSignIn;
    }

    getPageBooksProfile()
    {
        return this.pageBooksProfile;
    }

    getPageBoookShoppingCart()
    {
        return this.pageBoookShoppingCart;
    }

    getPageBooksCheckout()
    {
        return this.pageBooksCheckout;
    }
}

module.exports = {PageManager};