import Button from "../../atoms/button/Button";

const HomePage = (): JSX.Element => {
  return (
    <div>
      <Button onClick={() => console.log("HELLO")}>Test Button</Button>
    </div>
  );
};

export default HomePage;
