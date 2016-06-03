import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
    describe('a number', () => {
        let increment = (current) => {
            return current + 1;
        }
        
        it('is immutable', () => {
            let state = 42;
            let next = increment(state);
            expect(next).to.equal(43);
            expect(state).to.equal(42);
        });
    });
    
    describe('a list', () => {
        let addMovie = (current, movie) => {
            return current.push(movie);
        }
        
        it('is immutable', () => {
            let state = List.of('Trainspotting', '28 Days Later');
            let next = addMovie(state, 'Sunshine');
            
            expect(next).to.equal(List.of('Trainspotting', '28 Days Later', 'Sunshine'));
            expect(state).to.equal(List.of('Trainspotting', '28 Days Later'));
        });
    });
    
    describe('a tree', () => {
        let addMovie = (current, movie) => {
            return current.update('movies', movies => movies.push(movie));
        }
        
        it('is immutable', () => {
            let state = Map({
                movies: List.of('Trainspotting', '28 Days Later')
            });
            let next = addMovie(state, 'Sunshine');
            
            expect(next).to.equal(Map({
                movies: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            }));
            expect(state).to.equal(Map({
                movies: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });
});