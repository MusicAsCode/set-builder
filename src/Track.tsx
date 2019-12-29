import * as React from "react";
import "./Track.css";
import Counter from "./Counter";
import CounterReducer from "./CounterReducer";
import CounterTitle from "./CounterTitle";
import AssetSearch from "./AssetSearch";
import ToneSampler from "./ToneSampler";

// An object of all possible example components that can be rendered
const EXAMPLES = {
  Counter,
  CounterTitle,
  CounterReducer
};

type Examples = keyof typeof EXAMPLES;

const EXAMPLE_NAMES = Object.keys(EXAMPLES) as Examples[];

const App = () => {
  // Use state to keep track of the current displayed example component
  const [example, setExample] = React.useState<Examples>("Counter");

  // The currently selected example component that should be rendered
  const ExampleComponent = EXAMPLES[example];

  // A list of buttons for all examples to render
  const exampleButtons = EXAMPLE_NAMES.map(name => (
    <button
      key={name}
      onClick={() => setExample(name)}
      className={name === example ? "active" : ""}
    >
      &lt;
      {name} /&gt;
    </button>
  ));

  return (
    <>
      <div className="container">
        <div className="track">
          {exampleButtons}
          <div className="separator" />
          <ExampleComponent />
          <div className="output">
            <ToneSampler />
            <AssetSearch />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
