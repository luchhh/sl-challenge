import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Label } from "../../components/form/Label";
import { TextField } from "../../components/form/TextField";
import { Layout } from "../../components/Layout";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Title } from "../../components/Title";
import { CardBanner } from "./Card";
import { cardUpdated, selectCardById } from "./cardsSlice";

export const CardEdit = ({ className }) => {
  let params = useParams();
  const cardId = params.cardId;
  const card = useSelector((state) => selectCardById(state, cardId));
  const [name, setName] = useState(card.name);
  const [imageUrl, setImageUrl] = useState(card.imageUrl);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const onNameChanged = (e) => setName(e.target.value);
  const onImageUrlChanged = (e) => setImageUrl(e.target.value);

  const onSaveCardClicked = () => {
    if (name && imageUrl) {
      dispatch(
        cardUpdated({ id: cardId, changes: { name: name, imageUrl: imageUrl } })
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
        <form className="flex flex-wrap justify-center mt-8">
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
        </form>
        <PrimaryButton className="mt-6" onClick={onSaveCardClicked}>
          Save Card
        </PrimaryButton>
      </section>
    </Layout>
  );
};
