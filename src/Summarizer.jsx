import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
function App() {

  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");

  const summarizeText = () => {
    const sentences = inputText.split(/[.!?]/);
    const wordFreqs = sentences.map(sentence => {
      const words = sentence.toLowerCase().split(/[ ,]+/);
      const wordFreq = {};
      words.forEach(word => {
        if (!wordFreq[word]) {
          wordFreq[word] = 1;
        } else {
          wordFreq[word]++;
        }
      });
      return wordFreq;
    });
  
    const sentenceScores = wordFreqs.map(wordFreq => {
      let score = 0;
      Object.values(wordFreq).forEach(freq => {
        score += freq;
      });
      return score;
    });

    const summarySentences = [];
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
      const maxScoreIndex = sentenceScores.indexOf(Math.max(...sentenceScores));
      summarySentences.push(sentences[maxScoreIndex]);
      sentenceScores[maxScoreIndex] = -1; 
    }

    setSummary(summarySentences.join(" "));
  };

  return (
    <>
        <Container className="content-container">
        <h1 className="title"><label className="highlight">AI</label> Summarizer</h1>
        <Form className="form" onSubmit={summarizeText}>
          <Form.Group controlId="inputText">
            <Form.Control 
              className="form-text"
              as="textarea"
              rows={10}
              value={inputText}
              onKeyPress={summarizeText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
            />
          </Form.Group>
          <Button className="gen-button" onClick={summarizeText}> Generate</Button>
        </Form>
        {summary && (
          <div className="result">
            <p>{summary}</p>
          </div>
        )}
      </Container>
    </>
    
  );
}

export default App;
