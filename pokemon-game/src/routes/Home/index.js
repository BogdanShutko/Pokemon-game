import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import Pikachu from "../../assets/bg1.jpg";
import Team from "../../assets/bg2.jpg";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import PokemonsJSON from "../../data/Pokemons.json";
import MenuHeader from "../MenuHeader/MenuHeader";
import s from "./style.module.css";

function HomePage({ onChangePage }) {
  const handlerClickButton = (page) => {
    console.log("#####: <HomePage />");
    onChangePage && onChangePage(page);
  };
  const POKEMONS = PokemonsJSON;
  return (
    <div className="App">
      <MenuHeader />
      <Header
        title={"Forest"}
        descr={"A beautiful night forest"}
        onClickButton={handlerClickButton}
      ></Header>
      <Layout
        title="Pikachu"
        descr="The most well-known pokemon"
        urlBg={Pikachu}
      >
        <p>
          In the game two players face off against one another, one side playing
          as "blue", the other as "red" on a 3x3 grid. Each player has five
          cards in a hand and the aim is to capture the opponent's cards by
          turning them into the player's own color of red or blue.
        </p>
        <p>
          To win, a majority of the total ten cards played (including the one
          card that is not placed on the board) must be of the player's card
          color. To do this, the player must capture cards by placing a card
          adjacent to an opponent's card whereupon the 'ranks' of the sides
          where the two cards touch will be compared. If the rank of the
          opponent's card is higher than the player's card, the player's card
          will be captured and turned into the opponent's color. If the player's
          rank is higher, the opponent's card will be captured and changed into
          the player's color instead.{" "}
        </p>
      </Layout>
      <Layout title="Red" colorBg="red">
        <div className={s.flex}>
          {POKEMONS.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              values={pokemon.values}
              name={pokemon.name}
              img={pokemon.img}
              id={pokemon.id}
              type={pokemon.type}
            />
          ))}
        </div>
      </Layout>
      <Layout title="The Ash's Team" descr="Ash and his friends" urlBg={Team}>
        <p>
          In the game two players face off against one another, one side playing
          as "blue", the other as "red" on a 3x3 grid. Each player has five
          cards in a hand and the aim is to capture the opponent's cards by
          turning them into the player's own color of red or blue.
        </p>
        <p>
          To win, a majority of the total ten cards played (including the one
          card that is not placed on the board) must be of the player's card
          color. To do this, the player must capture cards by placing a card
          adjacent to an opponent's card whereupon the 'ranks' of the sides
          where the two cards touch will be compared. If the rank of the
          opponent's card is higher than the player's card, the player's card
          will be captured and turned into the opponent's color. If the player's
          rank is higher, the opponent's card will be captured and changed into
          the player's color instead.{" "}
        </p>
      </Layout>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
