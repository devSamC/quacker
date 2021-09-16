/*
  @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  })

  describe("head", () => {

    test('it has a link to CSS stylesheet', () => {
      let cssStylesheet = document.querySelector('[rel="stylesheet"]');
      expect(cssStylesheet).toBeTruthy();
    });

    test('script has a defer attribute', () => {
      let script = document.querySelector('script');
      expect(script.hasAttribute('defer')).toBeTruthy();
    });

    test('it has a title', () => {
      let title = document.querySelector('title');
      expect(title).toBeTruthy();
    });
    
    test('it has a favicon', () => {
      let favicon = document.querySelector('[rel="icon"]');
      expect(favicon).toBeTruthy();
    });

  });

  describe("body", () => {
    test("it has a header", () => {
      let header = document.querySelector('header');
      expect(header).toBeTruthy();
    });
  });


  describe("")

  

})