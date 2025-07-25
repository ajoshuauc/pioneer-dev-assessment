# Restaurant Finder API

A Node.js + TypeScript backend that enables users to search for restaurants using natural language, powered by a Groq-hosted LLM and the Foursquare Places API.

---

## 🛠 Setup Instructions for Running the Project Locally

### 1. Clone the Repository

```bash/terminal
git clone https://github.com/ajoshuauc/pioneer-dev-assessment.git
cd pioneer-dev-assessment
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Create .env file with API keys
```
GROQ_API_KEY = your_secret_groq_api_key
FOURSQAURE_API_KEY = your_secret_fs_api_key
PORT = your_port
```
NOTE: API keys were sent at the forms

## Assumptions
- The input message will be a clear, short restaurant-related query.
- LLM outputs follow a consistent format to be sent to foursquare(e.g., JSON with query, near, price, etc.).
- Foursquare API will return all fields as long as there are credits (name, cuisine, hours, etc.)
## Challenges
- Reading through the Foursqaure Docs as there was a lot of information. Some were also deprecated which led to more reading to find up to date docs.
- Finding resources with a similar implementation as some of them use deprecated functions.
## Limitations
- Rating, Price_level, and hours are premium features in Foursquare and not accessible even if you have free credits. This resulted in the system not being able to return those fields
  as I did not make a purchase with a credit card. It instead returns 'N/A' for those fields for now.







