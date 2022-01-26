import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCardById } from "./cardsSlice";
import cn from "classnames";
import { Link } from "react-router-dom";
import { CardDeleteModal } from "./CardDeleteModal";

export const CardBanner = ({
  imageUrl,
  altText = "",
  className,
  height = "h-product",
}) => {
  return (
    <>
      <div className={cn(className, "relative")}>
        {imageUrl ? (
          <img
            className={cn("w-full rounded-t object-contain", height, className)}
            alt={altText}
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <article
      className="shadow-lg group container rounded-md bg-white max-w-sm flex flex-col justify-center items-center mx-auto"
      key={card._id}
    >
      <div className="w-full rounded-t-md">
        <CardBanner imageUrl={card.imageUrl} altText={card.name} />
      </div>
      <div className="w-full py-2 px-4 bg-white">
        <span className="uppercase text-sm">{card.name}</span>
      </div>
      <div className="w-full py-2 px-4 bg-white rounded-b-md">
        <Link to={`/edit/${card._id}`}>
          <i className="text-2xl float-left las la-edit"></i>
        </Link>
        <i
          className="text-2xl float-right las la-trash"
          onClick={() => {
            setIsModalOpen(true);
          }}
        ></i>
        <CardDeleteModal
          cardId={cardId}
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
        />
      </div>
    </article>
  );
};
