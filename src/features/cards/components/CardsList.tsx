import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectCardsByFilter } from "../state/cardsSlice";
import { Spinner } from "../../../components/Spinner";
import cn from "classnames";
import { Card } from "./Card";

type CardListItemProps = {
  className?: string;
  children: React.ReactNode;
};
export const CardListItem = ({ className, children }: CardListItemProps) => {
  return (
    <div className={cn("pb-5 px-4 xl:w-1/4 md:w-1/2 w-10/12", className)}>
      {children}
    </div>
  );
};

type CardListLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

export const CardListLayout = ({
  className,
  children,
}: CardListLayoutProps) => {
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

type CardsListProps = {
  className?: string;
};
export const CardsList = ({ className }: CardsListProps) => {
  const orderedCardIds = useAppSelector((state) => selectCardsByFilter(state));
  const cardStatus = useAppSelector((state) => state.cards.status);
  const error = useAppSelector((state) => state.cards.error);

  return (
    <CardListLayout className={className}>
      <div className={cn("flex flex-wrap justify-center")}>
        {
          {
            loading: <Spinner />,
            failed: <div>{error}</div>,
            succeeded: orderedCardIds.map((cardId) => (
              <CardListItem key={cardId}>
                <Card key={cardId} cardId={cardId} />
              </CardListItem>
            )),
          }[cardStatus]
        }
      </div>
    </CardListLayout>
  );
};
