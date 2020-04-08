import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Card from "react-bootstrap/Card";

function TrainPredict() {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);

  const apiUrl = "http://localhost:3000/run";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:', result.data)
          setData(result.data)
          setShowLoading(false)
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
    };
    fetchData();
  }, []);

  

  return (
    <div>
      {showLoading === false
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>}

        <center>
        <Card style={{marginTop:"20px",width:"50%"}}>
        <Card.Header> <b><h1>Predicted Results</h1></b></Card.Header>
          <Card.Body>
            <h2> The values for species will be:</h2>
              <h4> - setosa: 1,0,0</h4>
              <h4> - virginica: 0,1,0</h4>
              <h4> - versicolor: 0,0,1</h4>
          
          </Card.Body>
        </Card>
          
          </center>
          <br />
          <br />
        
        <center>
          <Table style={{paddingLeft:"50px",width:"50%"}} striped bordered variant="light-blue" responsive="lg" >
            <thead>
              <tr>
                <th>Test 1</th>
                <th>Test 2</th>
                <th>Test 3</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>
                  {data.row1.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}
                </td>
                <td>
                  {data.row2.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}
                </td>
                <td>
                  {data.row3.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}
                </td>

              </tr>
            </tbody>
          </Table>
          </center>
        </div>
        :
        < div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Waiting for results...</span>
          </Spinner>}
        </div>

      }
    </div>

  );
}
export default TrainPredict;
