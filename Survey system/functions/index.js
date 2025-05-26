const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint to receive survey submission
app.post('/submit-survey', async (req, res) => {
  const { survey_id, answers, location } = req.body;
  if (!survey_id || !answers) {
    return res.status(400).json({ error: 'Missing survey_id or answers' });
  }

  try {
    const surveyRef = db.collection('surveyResponses').doc(survey_id);
    await surveyRef.set({
      responses: admin.firestore.FieldValue.arrayUnion({ answers, location })
    }, { merge: true });

    res.json({ message: 'Survey submitted successfully' });
  } catch (error) {
    console.error('Error saving survey response:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get survey results
app.get('/survey-results/:surveyId', async (req, res) => {
  const surveyId = req.params.surveyId;
  try {
    const surveyDoc = await db.collection('surveyResponses').doc(surveyId).get();
    if (!surveyDoc.exists) {
      return res.json({ surveyId, responses: [] });
    }
    const data = surveyDoc.data();
    res.json({ surveyId, responses: data.responses || [] });
  } catch (error) {
    console.error('Error fetching survey results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve view_result.html
app.get('/view-result', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view_result.html'));
});

exports.api = functions.https.onRequest(app);
