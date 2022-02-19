import { CardsList } from "./CardsList";
import { Layout } from "../../common/components/Layout";
import { CardFilter } from "./CardFilter";

export const CardsContainer = () => {
  return (
    <Layout>
      <CardFilter />
      <CardsList className="mt-12" />
    </Layout>
  );
};
