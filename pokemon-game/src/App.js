import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import Pikachu from "../src/assets/bg1.jpg";
import Team from "../src/assets/bg2.jpg";

function App() {
  return (
    <div className="App">
      <Header title={"Forest"} descr={"A beautiful night forest"}></Header>
      <Layout
        title="Pikachu"
        descr="The most well-known pokemon"
        urlBg={Pikachu}
        colorBg=""
      />
      <Layout title="Red" descr="Just a red layout" urlBg="" colorBg="red" />
      <Layout
        title="The Ash's Team"
        descr="Ash and his friends"
        urlBg={Team}
        colorBg=""
      />
      <Footer></Footer>
    </div>
  );
}

export default App;
