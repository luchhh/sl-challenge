import { CardsList } from "./components/CardsList";
import { Layout } from "../../components/Layout";
import { CardFilter } from "./components/CardFilter";

export const CardsContainer = () => {
  return (
    <Layout>
      <CardFilter />
      <CardsList className="mt-12" />
    </Layout>
  );
};
