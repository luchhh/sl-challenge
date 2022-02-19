import React, { useState } from "react";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { Link, useParams } from "react-router-dom";
import { Label } from "../../common/components/form/Label";
import { TextField } from "../../common/components/form/TextField";
import { Layout } from "../../common/components/Layout";
import { PrimaryButton } from "../../common/components/PrimaryButton";
import { Title } from "../../common/components/Title";
import { CardBanner } from "./Card";
import { cardUpdated } from "./state/cardsSlice";
import { buttonClicked } from "../../common/state/buttonClickedAction";
import { useMessageErrorBundle } from "../../common/hooks/useMessageErrorBundle";
import { useFindCardOrFailEffect } from "./hooks/useFindCardOrFailEffect";

type CardEditProps = { className?: string };

export const CardEditContainer = ({ className }: CardEditProps) => {
  const params = useParams();
  const cardId = params.cardId!!;
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, error, setMessage, setError, clearMessageError] =
    useMessageErrorBundle();

  useFindCardOrFailEffect(cardId, (card) => {
    setName(card.name);
    setImageUrl(card.imageUrl);
  });

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    clearMessageError();
  };
  const onImageUrlChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImageUrl(e.target.value);
    clearMessageError();
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
      setMessage("Card updated!");
    } else if (!name) {
      setError("Name field is required");
    } else if (!imageUrl) {
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
        {error && <div className="bg-red-400 text-white py-3">{error}</div>}
        {message && (
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
