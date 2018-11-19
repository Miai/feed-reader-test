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
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /**
         * Check if allFeeds object has a property <URL> defined
         * and that is not empty
         */
        it('allFeed has <URL> defined and not empty', function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });

        /**
         * Check if allFeeds object has a property <name> defined
         * and that is not empty
         */
        it('allFeed has <name> defined and not empty', function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    /* Test the "The menu" */
    describe('The menu', function() {
        let bodyEl = document.body;
        /**
         * Check if the menu is hidden by default
         * by checking if it has the class with the
         * proper styling for hidding.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            //expect(bodyEl).toHaveClass('menu-hidden')
        });

         /**
          * Check if the menu changes visibility each time the menu
          * icon is clicked
          */
        it('changes visibility when the menu icon is clicked', function(){
            const menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //expect(bodyEl).not.toHaveClass('menu-hidden');
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
            //expect(bodyEl).toHaveClass('menu-hidden');
        });

    });

    /* Test the "Initial Entries" */
    describe('Initial Entries', function() {

        /**
         * loadFeed() is asynchronous so it will require
         * Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, done);
        })
        /**
         * Make sure that at least an .entry element is contained within the
         * .feed container.
         */
        it('has at least one .entry contained within .feed', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        })
    });

    /* Test the "New Feed Selection" */
    describe('New Feed Selection', function() {

        let feedOne, feedTwo;
        /**
         * test if a new feed is loading
         */
        beforeEach(function(done){
            // first load of the feed
            loadFeed(1, function() {
                feedOne = $('.feed').html();
                // second load of the feed
                loadFeed(2, function() {
                    feedTwo = $('.feed').html();
                    done();
                })
            });
        });
        /**
         * test if feed is actually changing when new feed is loaded
         */
        it('is changing the feed content', function() {
            expect(feedOne).not.toBe(feedTwo);
        })
    });
}());
