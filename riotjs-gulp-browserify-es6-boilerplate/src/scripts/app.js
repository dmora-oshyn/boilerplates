'use strict';

import Riot from 'riot';
import '../tags/people-list.tag';
import '../tags/people-count.tag';
import '../tags/people-index.tag';
import '../tags/people-detail.tag';
import PeoplelistObservable from '../mixins/peoplelistObservable.js';

var params = {
    people: [
        { name: 'Peter', age: 20 },
        { name: 'James', age: 30 },
        { name: 'John', age: 40 },
        { name: 'Andrew', age: 50 },
        { name: 'Judas', age: 61 }
    ]
};

/**
 * Routes
 */
Riot.route.stop(); // clear all the old Riot.route callbacks
Riot.route.start(); // start again

var currentPage = null

var routes = {
    home: (id, action) => {
        var currentPage = Riot.mount('#view', 'people-index', { people: params.people });
    },
    people: function(id, action) {
        switch (action) {
            case 'detail':
                var currentPage = Riot.mount('#view', 'people-detail', { person: params.people[id] });
        }
    }
};

function handler(collection, id, action) {

    if (!Riot.mixin('peoplelistObservable')) {
        Riot.mixin('peoplelistObservable', new PeoplelistObservable());
    }

    if (currentPage) {
        currentPage.unmount(true)
    }

    var fn = routes[collection || 'home'];
    return fn ? fn(id, action) : console.error('no route found : ', collection, id, action);
}

Riot.route(handler);
Riot.route.exec(handler);
