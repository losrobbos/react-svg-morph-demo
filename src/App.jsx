import { useEffect, useState } from "react";
import "./App.css";
import { gsap } from "gsap";

import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

// outsource svg into own component
const SvgShape = ({ paths, index }) => {
  // immer wenn sich INDEX ändert,
  // dann morphe bitte ins nächste SVG
  useEffect(() => {
    console.log("Index hat sich geändert: ", index);

    // morphe den path in einen NEUEN Path
    // wir können GSAP den neuen Path als String übergeben
    gsap.to("path", {
      duration: 1,
      morphSVG: paths[index],
    });
  }, [index]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[0]} />
    </svg>
  );
};

function App() {
  // array mit shapes
  // ich will diese paths Daten nie ändern
  // also brauche ich keinen state
  const paths = [
    // music
    "m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z",
    // trash
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0",
    // book
    "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
    // mail
    "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
  ];

  // speichere aktuell sichtbaren PATH in State
  const [index, setIndex] = useState(0);

  // bei Button klick => erhöhe immer den Index vom aktuellen Path
  // der Index zeigt dann auf den nächsten Path, in den gemorphed werden soll
  const nextSvg = () => {
    // modulo trick
    // wenn wir immer mit modulo durch die Array length teilen,
    // bekommen wir immer den nächsten index
    // und am Ende fängt modulo wieder beim array von vorne an
    const indexNext = (index + 1) % paths.length;

    // der setter triggert das Re-Render.
    // und damit auch das Update von Props an Child Componenents
    setIndex(indexNext);
  };

  return (
    <>
      <h1>SVG Round Robin Morph</h1>

      <div>Aktuelles SVG: {index}</div>
      <div>
        <button onClick={nextSvg}>Next</button>
      </div>
      {/* gebe geänderten Index State immer an Child Component weiter */}
      <SvgShape paths={paths} index={index} />
    </>
  );
}

export default App;
