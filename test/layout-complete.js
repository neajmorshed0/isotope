test( 'layoutComplete', function() {

  'use strict';

  var iso = new Isotope( '#layout-complete', {
    layoutMode: 'fitRows',
    transitionDuration: '0.1s'
  });

  var tests = [
    function() {
      iso.once( 'layoutComplete', function() {
        ok( true, 'layoutComplete after some were filtered' );
        next();
      });

      iso.layout({
        filter: '.a1'
      });
    },
    function() {
      iso.once( 'layoutComplete', function() {
        ok( true, 'after some revealed, some hidden, some same' );
        next();
      });

      iso.layout({
        filter: '.b2'
      });
    },
    function() {
      iso.once( 'layoutComplete', function() {
        ok( true, 'after random sort' );
        next();
      });

      iso.layout({
        sortBy: 'random'
      });
    },
    function() {
      iso.once( 'layoutComplete', function() {
        ok( true, 'after layout mid-way thru transition' );
        next();
      });

      iso.layout({
        filter: '.a2',
        transitionDuration: '0.6s'
      });

      setTimeout( function() {
        iso.layout({
          filter: '.b2'
        });
      }, 300 );
    }
  ];

  function next() {
    if ( tests.length ) {
      var nextTest = tests.shift();
      // HACK for consecutive layoutComplete calls
      setTimeout( nextTest );
    } else {
      start();
    }
  }

  next();
  stop();

});
