/*
  @jest-environment jsdom
*/


const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
window.document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const newScript = require('../scripts/newScript');
const animals = require('../scripts/generate-ids/animals');
const generateCombination = require('../scripts/generate-ids/generateCombination');
const adjectives = require('../scripts/generate-ids/adjectives');
const axios = require('axios');

// import {changeDuck} from '../scripts/newScript'


jest.mock('axios');
jest.mock('../scripts/newScript')
describe('index.html', () => {

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  })

  describe("animals", () => {
    test("it exists", () => {
      expect(animals).toBeTruthy();
    })
  })
  
  describe("functions", () => {
      it("tests if newScript is defined", () => {
        expect(newScript).toBeDefined();
      })
      it("tests if changeDuck is defined", () => {
        expect(newScript.changeDuck).toBeTruthy();
      }) 
      it("tests if changeDuck is defined", () => {
        expect(newScript.changeDuck()).toBe('changed duck');
      }) 

      it("tests if createPage is defined",()=>{
        expect(newScript.createPage).toBeDefined();
      })
      it("tests if getIp is defined", () => {
        expect(newScript.getIp).toBeDefined();
      })
      it("tests if makeDuckAngry is defined", () => {
        expect(newScript.makeDuckAngry).toBeDefined();
      })
      it("tests if hideGifInput is defined", () => {
        expect(newScript.hideGifInput).toBeDefined();
      })
      it("tests if giveSearchInput is defined", () => {
        expect(newScript.giveSearchInput).toBeDefined();
      })
      it("tests if changeSort is defined", () => {
        expect(newScript.changeSort).toBeDefined();
      })
      it("tests if changeLogo is defined", () => {
        expect(newScript.changeLogo).toBeDefined();
      })
      it("tests if changeLogoBack is defined", () => {
        expect(newScript.changeLogoBack).toBeDefined();
      })
      it("tests if displayCharLimit is defined", () => {
        expect(newScript.displayCharLimit).toBeDefined();
      })
      it("tests if addImage is defined", () => {
        expect(newScript.addImage).toBeDefined();
      })
      it("tests if mainTextContains is defined", () => {
        expect(newScript.mainTextContains).toBeDefined();
      })
      it("tests if commentTextContains is defined", () => {
        expect(newScript.commentTextContains).toBeDefined();
      })
      it("tests if sortByReactions is defined", () => {
        expect(newScript.sortByReactions).toBeDefined();
      })
      it("tests if isFresh is defined", () => {
        expect(newScript.isFresh).toBeDefined();
      })
      it("tests if risingFunction is defined", () => {
        expect(newScript.risingFunction).toBeDefined();
      })

      it('tests if risingFunction returns a number',()=> {
        
        expect(newScript.risingFunction(a,b)).toBe(0)
      })
      it("tests if generateCard is defined", () => {
        expect(newScript.generateCard).toBeDefined();
      })
      it("tests if addComment is defined", () => {
        expect(newScript.addComment).toBeDefined();
      })
      it("tests if addReactionCount is defined", () => {
        expect(newScript.addReactionCount).toBeDefined();
      })
      it("tests if addCommentReactionCount is defined", () => {
        expect(newScript.addCommentReactionCount).toBeDefined();
      })
      it("tests if previewGif  is defined", () => {
        expect(newScript.previewGif ).toBeDefined();
      })
      it("tests if init is defined", () => {
        expect(newScript.init).toBeDefined();
      })
      it("tests if removePreview is defined", () => {
        expect(newScript.removePreview).toBeDefined();
      })
      it("tests if addQuack is defined", () => {
        expect(newScript.addQuack).toBeDefined();
      })
      it("tests if removePreview is defined", () => {
        expect(newScript.removePreview).toBeDefined();
      })
      it("tests if makeCommentsWork   is defined", () => {
        expect(newScript.makeCommentsWork  ).toBeDefined();
      })
      it("tests if makeReactionsWork is defined", () => {
        expect(newScript.makeReactionsWork).toBeDefined();
      })
      it("tests if toggleHidden is defined", () => {
        expect(newScript.toggleHidden).toBeDefined();
      })
      it("tests if makeCommentIconsWork is defined", () => {
        expect(newScript.makeCommentIconsWork).toBeDefined();
      })

  })


  
})



