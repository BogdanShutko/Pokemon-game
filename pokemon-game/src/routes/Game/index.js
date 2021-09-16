const GamePage = ({ onChangePage }) => {
  const onClickBackToHome = () => {
    onChangePage && onChangePage("app");
  };
  return (
    <div>
      <div>
        <h1>This is game Page!!!</h1>
      </div>
      <button className="button" onClick={onClickBackToHome}>
        Back To HomePage
      </button>
    </div>
  );
};

export default GamePage;
