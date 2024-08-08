import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);  // Usa la interfaz aquí

  useEffect(() => {
    axios.get('/api/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los pacientes:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
