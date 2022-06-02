import './Question.css';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Grid from '@mui/material/Grid';

const Question = () => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <div>
      <Container className="question-container">
        <Row>
          <h1 className="question-title">Frequently Asked Questions</h1>
        </Row>
        <Grid container columns={{ xs: 6, md: 12 }}>
          <Grid item xs={6}>
            <div className="wrapper">
              <div className="accordion">
                {data.map((item, i) => (
                  <div key={i} className="item">
                    <div className="title" onClick={() => toggle(i)}>
                      <h2>{item.question}</h2>
                      <span>{selected == i ? '-' : '+'}</span>
                    </div>
                    <div className={selected == i ? 'content show' : 'content'}>{item.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="form">
              <h4>
                <b>Do You Have More Questions?</b>
              </h4>
              <form>
                <div className="input-container">
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Your primary email"
                    name="uname"
                    required
                  />
                </div>

                <div className="input-container">
                  <input
                    type="password"
                    className="input-password"
                    placeholder="Question"
                    name="pass"
                    required
                  />
                </div>

                <div className="button-container input-submit">
                  <input type="submit" />
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const data = [
  {
    question: 'Question 1',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet'
  },
  {
    question: 'Question 2',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet'
  },
  {
    question: 'Question 3',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet'
  },
  {
    question: 'Question 4',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet'
  }
];

export default Question;
