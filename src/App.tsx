import { ClueRow } from "./components/ClueRow/ClueRow";
import { ClueRowHeader } from "./components/ClueRowHeader/ClueRowHeader";
import { CluesWrapper } from "./components/CluesWrapper/CluesWrapper";
import { Container } from "./components/Container/Container";
import { Header } from "./components/Header/Header";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { useCachedData } from "./hooks/useCachedData";
import { useAppContext } from "./store/context";
import { getAnimeById } from "./utils/getAnimeById";

function App() {
  const { state, initialized } = useAppContext();
  const cachedData = useCachedData();

  if (!initialized || !cachedData) {
    return null;
  }

  const data = state?.userGuesses?.map((id) =>
    getAnimeById(cachedData?.data ?? [], id)
  );

  return (
    <Container>
      <Header />
      <SearchBox />
      <CluesWrapper>
        {data.length > 0 && <ClueRowHeader />}
        {data.map((entry) => entry && <ClueRow data={entry} key={entry.id} />)}
      </CluesWrapper>
    </Container>
  );
}

export default App;
