import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCardById } from "./cardsSlice";
import cn from "classnames";

export const CardBanner = ({ card, className, height = "h-product" }) => {
  const { name, imageUrl } = card;

  return (
    <>
      <div className={cn(className, "relative")}>
        {imageUrl ? (
          <img
            className={cn("w-full rounded-t object-contain", height, className)}
            alt={name}
            src={imageUrl}
          />
        ) : (
          <div
            className={cn(
              "w-full rounded-t object-cover bg-gray-light",
              height
            )}
          />
        )}
      </div>
    </>
  );
};

export const Card = ({ cardId }) => {
  const card = useSelector((state) => selectCardById(state, cardId));
  return (
    <article
      className="shadow-lg group container rounded-md bg-white max-w-sm flex flex-col justify-center items-center mx-auto"
      key={card.id}
    >
      <div className="w-full rounded-t-md">
        <CardBanner card={card} />
      </div>
      <div className="w-full py-2 px-4 bg-white rounded-b-md">
        <span className="uppercase text-sm">{card.name}</span>
      </div>
    </article>
  );
};
