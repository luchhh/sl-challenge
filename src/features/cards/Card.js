import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCardById } from "./cardsSlice";
import cn from "classnames";
import { Link } from "react-router-dom";
import { CardDeleteModal } from "./CardDeleteModal";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

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
            style={{ minWidth: "250px" }}
          />
        ) : (
          <div
            className={cn(
              "w-full rounded-t object-cover bg-gray-light",
              height
            )}
            style={{ minWidth: "250px" }}
          />
        )}
      </div>
    </>
  );
};

export const Card = ({ cardId }) => {
  const card = useSelector((state) => selectCardById(state, cardId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
        <Button
          className="float-left"
          trackName="edit/attempt"
          onClick={() => navigate(`/edit/${card._id}`)}
        >
          <i className="text-2xl float-left las la-edit"></i>
        </Button>
        <Button
          className="float-right"
          trackName="delete/attempt"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <i className="text-2xl las la-trash"></i>
        </Button>
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
