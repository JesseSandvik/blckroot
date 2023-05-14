import Heading from "../../atoms/heading/Heading";

type SectionMainHeaderTypes = {
  heading: string;
};

const SectionMainHeader = ({ heading }: SectionMainHeaderTypes) => {
  return (
    <header id="section-main-header">
      <Heading tag="1">{heading}</Heading>
    </header>
  );
};

export default SectionMainHeader;
