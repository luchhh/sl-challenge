import Modal, { OnAfterOpenCallbackOptions } from "react-modal";
import React, { useEffect } from "react";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { SecondaryButton } from "../../../components/SecondaryButton";
import { TitleSm } from "../../../components/Title";
import { cardRemoved } from "../state/cardsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { buttonClicked } from "../../../state/buttonClickedAction";
import { useFindCardOrFail } from "../hooks/useFindCardOrFail";

type CardDeleteModalProps = {
  cardId: string;
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onAfterOpen?: (obj?: OnAfterOpenCallbackOptions) => void;
};

export const CardDeleteModal = ({
  cardId,
  isOpen,
  onRequestClose,
  onAfterOpen,
}: CardDeleteModalProps) => {
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

  useEffect(() => {
    Modal.setAppElement("#main");
  }, []);

  const card = useFindCardOrFail(cardId);
  const dispatch = useAppDispatch();

  const onConfirmClicked = () => {
    dispatch(buttonClicked({ eventName: "delete/confirm" }));
    dispatch(cardRemoved(cardId));
  };
  const onCancelClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(buttonClicked({ eventName: "delete/cancel" }));
    onRequestClose(e);
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
            className="mx-2 my-2"
            onClick={onCancelClicked}
          >
            cancel
          </SecondaryButton>
          <PrimaryButton className="mx-2 my-2" onClick={onConfirmClicked}>
            delete
          </PrimaryButton>
        </div>
      </section>
    </Modal>
  );
};
