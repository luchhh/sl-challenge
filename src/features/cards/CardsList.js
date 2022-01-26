import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCardsByFilter, selectCardsIds } from "./cardsSlice";
import { Spinner } from "../../components/Spinner";
import cn from "classnames";
import { Card } from "./Card";

export const CardListItem = ({ className, children }) => {
  return (
    <div className={cn("pb-5 px-4 xl:w-1/4 md:w-1/2 w-10/12", className)}>
      {children}
    </div>
  );
};

export const CardListContainer = ({ className, children }) => {
  return (
    <section
      className={cn(
        "cards-list container lg:max-w-screen-xl mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
};

export const CardsList = ({ className }) => {
  const orderedCardIds = useSelector((state) => selectCardsByFilter(state));
  const cardStatus = useSelector((state) => state.cards.status);
  const error = useSelector((state) => state.cards.error);

  let content;

  if (cardStatus === "loading") {
    content = <Spinner />;
  } else if (cardStatus === "succeeded") {
    content = orderedCardIds.map((cardId) => (
      <CardListItem key={cardId}>
        <Card key={cardId} cardId={cardId} />
      </CardListItem>
    ));
  } else if (cardStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <CardListContainer className={className}>
      <div className={cn("flex flex-wrap justify-center")}>{content}</div>
    </CardListContainer>
  );
};
