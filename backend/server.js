const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');  // Importar la configuración de DB desde un archivo externo

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Probar conexión a la base de datos
async function testDbConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Connected to the MySQL database.');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testDbConnection();

// Configura las rutas (ejemplo básico)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/client', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM myclinic.patients;');
    res.json(results);
  } catch (err) {
    console.error('Error al obtener clientes:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/newClient', async (req, res)=>{
  try{
    const { name, surname, age, phone, family_contact } = req.body;
    const insertClientQuery = 'INSERT INTO myclinic.patients (name, surname, age, phone, family_contact)  VALUES (?, ?, ?, ?, ?);'
    const [result] = await db.execute(insertClientQuery, [name, surname, age, phone, family_contact]);
    res.status(201).json({ message: 'Paciente añadido correctamente', result });
  } catch (err) {
    console.error('Error al insertar paciente', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
