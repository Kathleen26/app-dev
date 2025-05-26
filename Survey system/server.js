const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// In-memory storage for survey answers
// Structure: { surveyId: [ { answers: {}, location: {lat, lng} } ] }
const surveyResponses = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Endpoint to receive survey submission
app.post('/submit-survey', (req, res) => {
  const { survey_id, answers, location } = req.body;
  if (!survey_id || !answers) {
    return res.status(400).json({ error: 'Missing survey_id or answers' });
  }

  if (!surveyResponses[survey_id]) {
    surveyResponses[survey_id] = [];
  }

  surveyResponses[survey_id].push({ answers, location });

  res.json({ message: 'Survey submitted successfully' });
});

// Endpoint to get survey results
app.get('/survey-results/:surveyId', (req, res) => {
  const surveyId = req.params.surveyId;
  const responses = surveyResponses[surveyId] || [];
  res.json({ surveyId, responses });
});

app.get('/view-result', (req, res) => {
  res.sendFile(path.join(__dirname, 'view_result.html'));
});

app.listen(port, () => {
  console.log(`Survey backend server running at http://localhost:${port}`);
});