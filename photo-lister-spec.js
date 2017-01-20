const expect = require('chai').expect;
const cheerio = require('cheerio');
const PhotoLister = require('./photo-lister.js');

describe('PhotoLister', () => {
  it('should exist', () => {
    expect(PhotoLister).to.not.be.undefined;
  });
  describe('#photoToListItem()', () => {
    it('should take a photo object and return a list item string', () => {
      const input = {
        title: 'This is a test',
        url: 'http://loremflickr.com/960/593'
      };
      const expected = (
        `<li><figure><img src="http://loremflickr.com/960/593" alt=""/><figcaption>This is a test</figcaption></figure></li>`
      );
      const actual = PhotoLister.photoToListItem(input);
      expect(actual).to.equal(expected);
    });
    it('should take another photo object and return matching list item string', () => {
      const input = {
        title: 'This is another test',
        url: 'http://loremflickr.com/960/593/puppy'
      };
      const expected = (
        `<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/><figcaption>This is another test</figcaption></figure></li>`
      );
      const actual = PhotoLister.photoToListItem(input);
      expect(actual).to.equal(expected);
    });
  });

  describe('#photoListToHtml()', () => {
    it('should take an array of photo objects and convert them to HTML list', () => {
      const input = [{
        title: 'This is a test',
        url: 'http://loremflickr.com/960/593'
      }, {
        title: 'This is another test',
        url: 'http://loremflickr.com/960/593/puppy'
      }];
      const expected = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
        + '<figcaption>This is a test</figcaption></figure></li>'
        + '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
        + '<figcaption>This is another test</figcaption></figure></li></ul>';
      const actual = PhotoLister.photoListToHTML(input);
      expect(actual).to.equal(expected);
    });
  });

  describe('#addPhotosToElement()', () => {
    it('should take an HTML string of list items and add them to an element with a given selector', () => {
      const $ = cheerio.load('<html><head></head><body><div id="app"></div></body></html>');
      const list = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
        + '<figcaption>This is a test</figcaption></figure></li>'
        + '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
        + '<figcaption>This is another test</figcaption></figure></li></ul>';
      const selector = '#app';
      const $div = PhotoLister.addPhotosToElement($, selector, list);
      expect($div.find('ul').length).to.equal(1);
      expect($div.find('li').length).to.equal(2);
      expect($div.find('figure').length).to.equal(2);
      expect($div.find('img').length).to.equal(2);
      expect($div.find('figcaption').length).to.equal(2);
    });
  });
});
