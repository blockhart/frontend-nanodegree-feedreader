/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page? [It fails the "not.toBe(0)"" test" - WML]
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has feeds each with URLs that are defined and not empty', function() {
            allFeeds.forEach(function(feedItem) {
                var urlTest = feedItem.url;
                expect(urlTest).toBeDefined();
                expect(urlTest).not.toBe('');
            });
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has feeds each with names that are defined and not empty', function() {
            allFeeds.forEach(function(feedItem) {
                var urlTest = feedItem.url;
                expect(urlTest).toBeDefined();
                expect(urlTest).not.toBe('');
            });
        });
    });
        

    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var slideMenu = document.querySelector('.slide-menu'),
            menuIcon = document.querySelector('.menu-icon-link'),
            offscreenXPosition = -192,
            onscreenXPosition = 0;

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            expect(slideMenu.getBoundingClientRect().x).toBe(offscreenXPosition);
        });


        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('and displays when clicked and hides when clicked again', function(done) {
            // Click first time to bring onscreen
            menuIcon.click(); 
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Because of the css transformation timing, need a delay
            // that isn't reliant upon a function call-back    
            var firstTimer = setTimeout(function() {
                expect(slideMenu.getBoundingClientRect().x).toBe(onscreenXPosition);
                menuIcon.click();
                expect($('body').hasClass('menu-hidden')).toBe(true)
                // Need another timing delay after second menu click.               
                var insideTimer = setTimeout(function() {
                    expect(slideMenu.getBoundingClientRect().x).toBe(offscreenXPosition);
                    done();
                },300);                
            },300);
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var entriesLength = 0;

        beforeEach(function(done) {
            var container = $('.feed');
            container.empty();
            loadFeed(0,done);
        });

        it('have at least one entry', function(done) {
            var entries = document.querySelectorAll('.feed .entry-link .entry');
            expect(entries.length).not.toBe(0);
            done();
        });
    }); 
    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var firstContainer, secondContainer = $('.feed');

        beforeEach(function (done) {
            loadFeed(0, function() {
                firstContainer = $('.feed').html();
                done();
            });
            loadFeed(1, function() {
                secondContainer = $('.feed').html();
                done();
            });
        });

        afterAll(function(done){
            loadFeed(0, function() {
                done();
            });
        });

        it('changes content on the page', function() {
            expect(firstContainer).not.toBe(secondContainer);
        });
    }); 
}());
