import { meaning } from "../../interfaces";
import "./PartOfSpeech.scss";

interface Props {
  meaning: meaning;
}

function PartOfSpeech(props: Props) {
  const meaning = props.meaning;

  const definintions = meaning.definitions.map((definition, index: number) => {
    return (
      <li className="definition__list" key={index}>
        {definition.definition}
      </li>
    );
  });
  let antonyms: JSX.Element[] | null = null;
  if (meaning.antonyms) {
    antonyms = meaning.antonyms.map((antonym: string, index: number) => {
      return (
        <li className="definition__list" key={index}>
          {antonym}
        </li>
      );
    });
  }

  let synonyms: JSX.Element[] | null = null;
  if (meaning.synonyms) {
    synonyms = meaning.synonyms.map((synonym: string, index: number) => {
      return (
        <li className="definition__list" key={index}>
          {synonym}
        </li>
      );
    });
  }

  return (
    <div className="definition">
      <h3>{meaning.partOfSpeech}</h3>
      <ul>{definintions}</ul>
      {antonyms && (
        <div>
          <h3>Antonyms</h3>
          <ul>{antonyms}</ul>
        </div>
      )}
      {synonyms && (
        <div>
          <h3>Synonyms</h3>
          <ul>{synonyms}</ul>
        </div>
      )}
    </div>
  );
}

export default PartOfSpeech;
