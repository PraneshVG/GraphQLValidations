const fs = require("fs");
const path = require("path");
const EasyGraphQLTester = require("easygraphql-tester");
const mocha = require("mocha");
const { graphql } = require("graphql");
var expect = require("chai").expect;
var util = require("util");

const schemaCode = fs.readFileSync(
  path.join("./schema/movies-schema.gql"),
  "utf8"
);

describe("Test Schema", () => {
    let tester;
  
    before(() => {
      tester = new EasyGraphQLTester(schemaCode);
    });

    // This test case will verify if schema provided below is valid Schema or not
    it('Validating Valid Schema for Movies', () => {
        const query = `
      {
        movies {
          name
          genre
          actor{
            name
            age
          }
        }
      }      
      `;

      // True is passed to check if provided 'query' is correct. Passing False here will fail the test
      // Since query is valid
      tester.test(true, query);
    })

    it('Validating Valid Schema for Actors', () => {
        const query = `
      {
        actors {
          id
          name
          age
        }
      }      
      `;

      // True is passed to check if provided 'query' is correct. Passing False here will fail the test
      // Since query is valid
      tester.test(true, query);
    })

    // This test case will verify if schema provided below is valid Schema or not
    it('Validating Invalid Schema for Movies', () => {
        const query = `
      {
        movies {
          idea
          genre
          actor{
            name
            age
          }
        }
      }      
      `;

      // False is passed to check if provided 'query' is incorrect. Passing True here will fail the test
      // Since query is valid
      tester.test(false, query);
    })

});

describe("Test Queries", () => {
    let tester;

    before(() => {
      tester = new EasyGraphQLTester(schemaCode);
    });

    it("Validating valid query for schema", () => {
      const query = `
      {
        movie(id:"1234"){
          name
          genre
          actor{
            name
          }
        }
      }      
      `;
     
      // True is passed to check if provided 'query' is correct. Passing False here will fail the test
      // Since query is valid
      tester.test(true, query);
    });

    it("Validating Invalid query for schema", () => {
        const query = `
        {
          movie(id:"2343243242343243242"){
            na
            genre
            actor{
              name
            }
          }
        }      
        `;
       
        // False is passed to check if provided 'query' is incorrect. Passing True here will fail the test
      // Since query is valid
        tester.test(false, query);
      });
});
