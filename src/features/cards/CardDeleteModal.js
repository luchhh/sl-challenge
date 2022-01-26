import Modal from "react-modal";
import React, { useState } from "react";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SecondaryButton } from "../../components/SecondaryButton";
import { TitleSm } from "../../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { cardRemoved, selectCardById } from "./cardsSlice";

export const CardDeleteModal = ({
  cardId,
  isOpen,
  onRequestClose,
  onAfterOpen,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.7)",
    },
  };

  Modal.setAppElement(document.getElementById("main"));
  const card = useSelector((state) => selectCardById(state, cardId));
  const dispatch = useDispatch();
  const onDeleteClicked = () => {
    dispatch(cardRemoved(cardId));
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <section className="text-center">
        <TitleSm>¿Are you sure?</TitleSm>
        <p className="mt-4">
          You are about to delete card <strong>{card.name}</strong>. This
          operation is not reversible
        </p>
        <div className="text-center mt-4">
          <SecondaryButton
            autoFocus
            className={"mx-2 my-2"}
            onClick={onRequestClose}
          >
            cancel
          </SecondaryButton>
          <PrimaryButton className={"mx-2 my-2"} onClick={onDeleteClicked}>
            delete
          </PrimaryButton>
        </div>
      </section>
    </Modal>
  );
};
