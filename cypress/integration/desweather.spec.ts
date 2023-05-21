/// <reference types="Cypress" />

describe("Desweather App", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
  });

  it("check application title", function () {
    cy.title().should("eq", "Desweather | Your climate friend");
  });

  it("user has not allowed access to location", function () {
    cy.get("#shareLocationInfo").should("contain", "Share your location");
    cy.get("#enterCityInfo").should("contain", "Search for a city");
  });

  it("get fake user location", function () {
    cy.fixture("location.json").as("fakeLocation");

    cy.get("@fakeLocation").then((fakeLocation) => {
      cy.visit("http://localhost:3000/", {
        onBeforeLoad(win) {
          cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
            (cb) => {
              return cb(fakeLocation);
            }
          );
        },
      });

      cy.get("#popupTitle")
        .should("be.visible")
        .should("contain", "Live Weather Condition");
      cy.get("#wheaterTemperature").should("be.visible");
      cy.get("#cityAndCountry")
        .should("be.visible")
        .should("contain", "Rebréchien | FR");
      cy.get("#weatherDaily").should("be.visible");
    });
  });

  it("search for a city typing on input", function () {
    cy.get("#inputCity").should("be.visible").type("Fortaleza{enter}");

    cy.get("#popupTitle")
      .should("be.visible")
      .should("contain", "Live Weather Condition");
    cy.get("#wheaterTemperature").should("be.visible");
    cy.get("#cityAndCountry")
      .should("be.visible")
      .should("contain", "Fortaleza | BR");
    cy.get("#weatherDaily").should("be.visible");

    cy.get("#inputCity").should("be.visible").should("contain", "");
  });

  it("search for a city clicking on the map", function () {
    cy.get("#inputCity").should("be.visible").type("Fortaleza{enter}");

    cy.get("#popupTitle")
      .should("be.visible")
      .should("contain", "Live Weather Condition");
    cy.get("#wheaterTemperature").should("be.visible");
    cy.get("#cityAndCountry")
      .should("be.visible")
      .should("contain", "Fortaleza | BR");
    cy.get("#weatherDaily").should("be.visible");

    cy.get("#inputCity").should("be.visible").should("contain", "");

    cy.get("#map").click(200, 200);

    cy.get("#popupTitle")
      .should("be.visible")
      .should("contain", "Live Weather Condition");
    cy.get("#wheaterTemperature").should("be.visible");
    cy.get("#cityAndCountry")
      .should("be.visible")
      .should("contain", "Paracuru | BR");
    cy.get("#weatherDaily").should("be.visible");
  });
});
