import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import cn from "classnames";
import { CardDeleteModal } from "./CardDeleteModal";
import { Button } from "../../common/components/Button";
import { useNavigate } from "react-router-dom";
import { buttonClicked } from "../../common/state/buttonClickedAction";
import { useFindCardOrFail } from "./hooks/useFindCardOrFail";

type CardBannerProps = {
  imageUrl?: string;
  altText?: string;
  className?: string;
  heightClass?: string;
  onClick?(e: React.MouseEvent<HTMLImageElement>): void;
};

export const CardBanner = ({
  imageUrl,
  altText = "",
  className = "",
  heightClass = "h-product",
  onClick,
}: CardBannerProps) => {
  return (
    <>
      <div className={cn(className, "relative")}>
        {imageUrl ? (
          <img
            className={cn(
              "w-full rounded-t object-contain",
              onClick && "cursor-pointer",
              heightClass,
              className
            )}
            alt={altText}
            src={imageUrl}
            style={{ minWidth: "250px" }}
            onClick={onClick}
          />
        ) : (
          <div
            className={cn(
              "w-full rounded-t object-cover bg-gray-light",
              heightClass
            )}
            style={{ minWidth: "250px" }}
          />
        )}
      </div>
    </>
  );
};

type CardProps = {
  cardId: string;
};

export const Card = ({ cardId }: CardProps) => {
  const card = useFindCardOrFail(cardId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onDeleteAttempt = () => {
    dispatch(buttonClicked({ eventName: "delete/attempt" }));
    setIsModalOpen(true);
  };
  const onEditAttempt = (cardId: string) => {
    dispatch(buttonClicked({ eventName: "edit/attempt" }));
    navigate(`/edit/${cardId}`);
  };

  return (
    <article
      className="shadow-lg group container rounded-md bg-white max-w-sm flex flex-col justify-center items-center mx-auto"
      key={card._id}
    >
      <div className="w-full rounded-t-md">
        <CardBanner
          imageUrl={card.imageUrl}
          altText={card.name}
          onClick={() => {
            onEditAttempt(card._id);
          }}
        />
      </div>
      <div className="w-full py-2 px-4 bg-white">
        <span className="uppercase text-sm">{card.name}</span>
      </div>
      <div className="w-full py-2 px-4 bg-white rounded-b-md">
        <Button
          className="float-left"
          onClick={() => {
            onEditAttempt(card._id);
          }}
        >
          <i className="text-2xl float-left las la-edit"></i>
        </Button>
        <Button className="float-right" onClick={onDeleteAttempt}>
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
