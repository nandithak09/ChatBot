This repository contains a chatbot for answering how-to questions related to four different Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap. The chatbot utilizes an indexer that extracts information from the official documentation of these CDPs and serves answers to the user's questions.

The project includes two main components:
indexer.js: Handles extracting and indexing the CDP documentation.
server.js: Serves as the backend to process the user's questions and return answers by querying the indexed data.

**Table of Contents**
1. Project Overview
2. Technologies Used
3.How to Use
4. Contributing
   
**Project Overview**
This project allows users to ask how-to questions regarding Segment, mParticle, Lytics, and Zeotap. The chatbot uses a custom-built indexer to fetch the relevant documentation, and the backend serves the answers by querying the indexed data.

**Core Components:**
1. indexer.js:
Responsible for reading the documentation of each CDP (Segment, mParticle, Lytics, Zeotap) and indexing the content for fast search and retrieval.
The indexed data is stored and served to the backend to answer questions.
2. server.js:
The backend server processes the incoming questions from the front end and queries the indexed data for relevant answers.
It serves the answers back to the frontend, which displays them to the user.

**Technologies Used**
1. Node.js: Server-side JavaScript runtime environment.
2. Express.js: Web framework for building the REST API.
3. File System (fs): For reading and indexing documentation files.
4. Frontend: HTML, CSS, JavaScript for the chatbot UI.

**How to Use**
1. Choose the Platform: Select one of the available platforms (Segment, mParticle, Lytics, Zeotap) from the dropdown.
2. Ask a Question: Type your how-to question in the input field. Example questions:
3. "How do I set up a new source in Segment?"
4. "How can I create a user profile in mParticle?"
5. Get the Answer: The server will process your question and return the most relevant answer from the indexed documentation.

**Key Files:**
1. indexer.js: This script reads and indexes the documentation files. It breaks down the content into indexable sections and stores them for easy access during question answering.
2. server.js: This is the Express server that listens for questions, processes them, and returns relevant answers based on the indexed data.
4. index.html: The frontend UI where users can ask questions and view responses.
   
Contributing
If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request.

**How to Contribute:**
Fork the repository.
Create a new branch for your feature or fix.
Make changes to the code.
Test the changes locally.
Create a pull request.
