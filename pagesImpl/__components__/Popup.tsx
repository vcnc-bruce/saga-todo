import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  isPopupVisible,
  popupActions,
  popupQuestion,
} from "../../lib/store/popup/popup.slice";

export default function Popup() {
  const dispatch = useDispatch();
  const isVisible = useSelector(isPopupVisible);
  const question = useSelector(popupQuestion);

  if (!isVisible) {
    return null;
  }

  return (
    <PopupLayout>
      <div>{question}</div>
      <ButtonLayout>
        <button onClick={() => dispatch(popupActions.onApproveButtonClick())}>
          Y
        </button>
        <button onClick={() => dispatch(popupActions.onDenyButtonClick())}>
          N
        </button>
      </ButtonLayout>
    </PopupLayout>
  );
}

const PopupLayout = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  width: 400px;
  height: 600px;
  border: 1px solid black;
  background: gray;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-conent: center;
  align-items: center;
`;
