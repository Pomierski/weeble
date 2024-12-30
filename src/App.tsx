import { useWindowSize } from "@uidotdev/usehooks";
import { CluesWrapper } from "./components/CluesWrapper/CluesWrapper";
import { Container } from "./components/Container/Container";
import { Header } from "./components/Header/Header";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { useCachedData } from "./hooks/useCachedData";
import { useAppContext } from "./store/context";
import { getAnimeById } from "./utils/getAnimeById";
import { isDefined } from "./utils/isDefined";

function App() {
  const { state, initialized } = useAppContext();
  const cachedData = useCachedData();
  const windowSize = useWindowSize();

  if (!initialized || !cachedData) {
    return null;
  }

  const isMobile = isDefined(windowSize.width) && windowSize.width <= 740;
  const data = state?.userGuesses?.map((id) =>
    getAnimeById(cachedData?.data ?? [], id)
  ).filter(isDefined);

  return (
    <Container>
      <Header />
      <SearchBox />
      {data.length > 0 &&
        <CluesWrapper isMobile={isMobile} data={data} />}
    </Container>
  );
}

export default App;
