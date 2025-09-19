
# VisClaimer - from visual evidence to clear claims
VisClaimer is an interactive interface built on the claim-evidence framework. It demonstrates how scientific charts and their captions encode multiple possible messages and how different reasoning strategies shape the claims that readers can draw.

## Project Goals
VisClaimer helps users search and reason with scientific visualizations:
- **Multiple sources, one topic** – Enter a topic and see a list of chart + caption pairs whose data support claims similar to your query.
- **One chart, many claims** – Explore a single chart + caption pair and examine how multiple, distinct claims can emerge from the same evidence.
- **Reasoning strategies revealed** – Discover how claims differ because different reasoning strategies (e.g., contrastive reasoning, causal inference, corroboration, triangulation) were used to link evidence to conclusions.

This UI illustrates the core idea: that a chart and caption together form a claim-evidence unit which, when reframed, can support multiple scientifically valid messages

## Live Demo

The project is publicly available at:

👉 [View the app on Vercel](https://claim-evidence-framework-u485.vercel.app/)

## Running Locally

To run the project locally:

1. Clone the repository:
	```sh
	git clone https://github.com/njitvis/claim-evidence-framework.git
	cd claim-evidence-framework
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the development server:
	```sh
	npm start
	```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tools Used

- React
- Tailwind CSS
- React Router
- Vercel (deployment)
