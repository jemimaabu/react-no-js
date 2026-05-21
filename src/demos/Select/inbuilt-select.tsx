import { useRenderCount } from '../../perf/PerfPanel';

const POKEMON = [
  {
    value: 'charmander',
    label: 'Charmander',
    img: 'https://static.wikia.nocookie.net/allspecies/images/5/56/Charmander.png/',
    bg: '#F8C9A0',
  },
  {
    value: 'bulbasaur',
    label: 'Bulbasaur',
    img: 'https://static.wikia.nocookie.net/allspecies/images/4/43/Bulbasaur.png',
    bg: '#BEE8D0',
  },
  {
    value: 'pichu',
    label: 'Pichu',
    img: 'https://static.wikia.nocookie.net/allspecies/images/9/9d/Pichu.png',
    bg: '#FFF6B2',
  },
  {
    value: 'squirtle',
    label: 'Squirtle',
    img: 'https://archives.bulbagarden.net/media/upload/thumb/5/54/0007Squirtle.png/500px-0007Squirtle.png',
    bg: '#BEE2F5',
  },
];

export function CssPokemonSelect() {
  useRenderCount('Select · <CssPokemonSelect> [CSS]');
  return (
    <div className="css-select-root">
      <select
        className="base-select"
        name="pokemon"
        defaultValue=""
        aria-label="Choose a baby Pokémon"
      >
        {/* Custom button part — rendered in supporting browsers */}
        <button>
          {/* @ts-expect-error: <selectedcontent> is a new HTML element */}
          <selectedcontent></selectedcontent>
          <span className="arrow"></span>
        </button>

        <option disabled value="" hidden>
          Choose a baby Pokémon
        </option>
        {POKEMON.map((p) => (
          <option key={p.value} value={p.value} data-bg-color={p.bg}>
            <img src={p.img} alt="" width={24} height={24} />
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}
