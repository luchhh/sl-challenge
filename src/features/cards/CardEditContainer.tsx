import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { Link, useParams } from "react-router-dom";
import { Label } from "../../common/components/form/Label";
import { TextField } from "../../common/components/form/TextField";
import { Layout } from "../../common/components/Layout";
import { PrimaryButton } from "../../common/components/PrimaryButton";
import { Title } from "../../common/components/Title";
import { CardBanner } from "./Card";
import { cardUpdated, selectAllCards } from "./state/cardsSlice";
import { buttonClicked } from "../../common/state/buttonClickedAction";

//TODO: order and group the methods

type CardEditProps = { className?: string };

export const CardEditContainer = ({ className }: CardEditProps) => {
  const params = useParams();
  //TODO: what to do with card not found case
  const cardId = params.cardId!!;
  const cards = useAppSelector(selectAllCards);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //TODO: find a more elegant way
  //custom hook to handle direct access to edit page
  //for some reason selectCardById selector was not reloading when cards were fetched
  useEffect(() => {
    if (cards.length > 0) {
      const card = cards.find((card) => card._id === cardId);
      if (card) {
        setName(card.name);
        setImageUrl(card.imageUrl);
      }
    }
  }, [cardId, cards]);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError("");
    setMessage("");
  };
  const onImageUrlChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImageUrl(e.target.value);
    setError("");
    setMessage("");
  };

  const onSaveCardClicked = () => {
    dispatch(buttonClicked({ eventName: "edit/save" }));
    if (name && imageUrl) {
      dispatch(
        cardUpdated({
          id: cardId,
          changes: { name: name, imageUrl: imageUrl },
        })
      );
      setError("");
      setMessage("Card updated!");
    } else if (!name) {
      setMessage("");
      setError("Name field is required");
    } else if (!imageUrl) {
      setMessage("");
      setError("Image URL field is required");
    }
  };

  return (
    <Layout>
      <div className="w-full ml-12 text-left">
        <Link to="/">Back to list</Link>
      </div>
      <section className="pb-8">
        <Title>Edit Card</Title>
        {error && !message && (
          <div className="bg-red-400 text-white py-3">{error}</div>
        )}
        {message && !error && (
          <div className="bg-emerald-500 text-white py-3">{message}</div>
        )}
        <form
          className="flex flex-wrap justify-center mt-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="xl:w-1/2 w-full xl:pr-8">
            <Label className="block mt-6" htmlFor="cardName">
              Name:
            </Label>
            <TextField
              id="cardName"
              name="cardName"
              placeholder="Think a nice name"
              value={name}
              onChange={onNameChanged}
              className="block mt-4 mx-auto"
            />
            <Label className="block mt-12" htmlFor="cardImageUrl">
              Image URL:
            </Label>
            <textarea
              id="cardImageUrl"
              name="cardImageUrl"
              value={imageUrl}
              onChange={onImageUrlChanged}
              className="block mt-8 mx-auto"
            />
          </div>
          <div className="xl:w-1/2 w-full xl:mt-0 mt-8">
            <CardBanner imageUrl={imageUrl} />
          </div>
          <PrimaryButton className="mt-6" onClick={onSaveCardClicked}>
            Save Card
          </PrimaryButton>
        </form>
      </section>
    </Layout>
  );
};
