import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../lib/store/store";
import Modal from "../pagesImpl/__components__/Modal";
import Popup from "../pagesImpl/__components__/Popup";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Modal>
        <Popup />
      </Modal>
    </>
  );
}

export default wrapper.withRedux(MyApp);
