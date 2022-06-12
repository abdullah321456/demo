import logo from './logo.svg';
import './App.css';
import Container from "@mui/material/Container/Container";
import DisplayData from "./Components/DisplayData";

function App() {
  return (
    <Container fixed sx={{height:"100vh"}}>
      <DisplayData/>
    </Container>
  );
}

export default App;
