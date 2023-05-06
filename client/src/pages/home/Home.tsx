import Button from "../../atoms/button/Button";

const HomePage = (): JSX.Element => {
  return (
    <div>
      <Button disabled onClick={() => console.log("HELLO")}>
        Test Button
      </Button>
    </div>
  );
};

export default HomePage;
