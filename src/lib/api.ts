import axios from 'axios';

// point this at your Spring Boot base URL
export default axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
