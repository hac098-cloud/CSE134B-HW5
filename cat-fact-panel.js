"use strict";

class CatFactPanel extends HTMLElement {
    static get observedAttributes() {
        return ["compact"];
    }

    constructor() {
        super();
        this.sampleFacts = [
            "Cats can rotate their ears independently to locate sounds.",
            "A group of cats is sometimes called a clowder.",
            "Cats use their whiskers to help judge whether spaces are narrow."
        ];
        this.sampleIndex = 0;
        this.initialized = false;
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        const card = document.createElement("div");
        card.className = "cat-fact-panel__card";

        this.heading = document.createElement("h3");
        this.heading.textContent = "A fact about cats";
        this.fact = document.createElement("p");
        this.fact.className = "cat-fact-panel__fact";
        this.status = document.createElement("p");
        this.status.className = "cat-fact-panel__status";
        this.status.setAttribute("role", "status");
        this.status.setAttribute("aria-live", "polite");
        this.details = document.createElement("p");
        this.details.className = "cat-fact-panel__details";
        this.details.textContent = "Sample facts work offline. Live facts are requested only when you activate the API button.";

        const controls = document.createElement("div");
        controls.className = "cat-fact-panel__controls";
        this.sampleButton = document.createElement("button");
        this.sampleButton.type = "button";
        this.sampleButton.textContent = "Show next sample";
        this.liveButton = document.createElement("button");
        this.liveButton.type = "button";
        this.liveButton.textContent = "Get a live cat fact";

        controls.append(this.sampleButton, this.liveButton);
        card.append(this.heading, this.fact, this.details, controls, this.status);
        this.appendChild(card);

        this.fact.textContent = this.sampleFacts[this.sampleIndex];
        this.setStatus(`Sample fact ${this.sampleIndex + 1} of ${this.sampleFacts.length}.`);

        this.sampleButton.addEventListener("click", () => this.showNextSample());
        this.liveButton.addEventListener("click", () => this.loadLiveFact());
        this.updateCompactState();
    }

    attributeChangedCallback() {
        this.updateCompactState();
    }

    updateCompactState() {
        if (this.details) this.details.hidden = this.hasAttribute("compact");
    }

    setStatus(message) {
        this.status.textContent = message;
    }

    showNextSample() {
        this.sampleIndex = (this.sampleIndex + 1) % this.sampleFacts.length;
        this.fact.textContent = this.sampleFacts[this.sampleIndex];
        this.setStatus(`Sample fact ${this.sampleIndex + 1} of ${this.sampleFacts.length}.`);
    }

    async loadLiveFact() {
        this.liveButton.disabled = true;
        this.setStatus("Loading a live cat fact…");

        try {
            const response = await fetch("https://catfact.ninja/fact");
            if (!response.ok) {
                throw new Error(`The API returned HTTP ${response.status}.`);
            }

            const data = await response.json();
            if (!data || typeof data.fact !== "string" || data.fact.trim() === "") {
                throw new Error("The API response did not contain a cat fact.");
            }

            this.fact.textContent = data.fact;
            this.setStatus("Live cat fact loaded.");
        } catch (error) {
            console.error("Could not load a live cat fact.", error);
            this.setStatus("Could not load a live cat fact. Check your connection and try again.");
        } finally {
            this.liveButton.disabled = false;
        }
    }
}

customElements.define("cat-fact-panel", CatFactPanel);

const catFactPanel = document.querySelector("cat-fact-panel");
const modeToggle = document.querySelector("#cat-fact-mode-toggle");
let compactMode = false;

try {
    const savedMode = localStorage.getItem("hw5-cat-fact-panel-mode");
    if (savedMode === "compact") compactMode = true;
} catch (error) {
    console.error("Could not read the cat fact display preference.", error);
    catFactPanel.setStatus("Saved display preference unavailable; using expanded mode.");
}

function applyCompactMode(isCompact) {
    catFactPanel.toggleAttribute("compact", isCompact);
    modeToggle.setAttribute("aria-pressed", String(isCompact));
    modeToggle.textContent = isCompact ? "Use expanded display" : "Use compact display";
}

applyCompactMode(compactMode);
modeToggle.hidden = false;
modeToggle.addEventListener("click", () => {
    compactMode = !catFactPanel.hasAttribute("compact");
    applyCompactMode(compactMode);

    try {
        localStorage.setItem("hw5-cat-fact-panel-mode", compactMode ? "compact" : "expanded");
    } catch (error) {
        console.error("Could not save the cat fact display preference.", error);
        catFactPanel.setStatus("Display changed for this visit, but the preference could not be saved.");
    }
});
