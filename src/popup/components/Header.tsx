import { css } from "@emotion/react";
import SharePopup from "./ShareButton";
import logo from "../assets/logo.png";
import { HtmlHTMLAttributes } from "react";
import { useLocation } from "react-router-dom";

export default function Header(props: HtmlHTMLAttributes<HTMLHeadElement>) {
  const location = useLocation();
  return (
    <div
      css={css`
        .layout-header {
          display: grid;
          grid-template-columns: 100px 110px;
          justify-content: space-between;
          justify-items: start;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 20px;
          background: white;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .none {
          opacity: 0;
          height: 0;
          width: 0;
          z-index: -1;
        }

        img {
          width: 100%;
        }

        p {
          margin: 0;
        }
        .copy {
          background: rgba(0, 0, 0, 0.1);
          margin: 0 5px;
          padding: 1px 5px;
          cursor: pointer;
        }
      `}
      {...props}
    >
      <header
        className={
          location.pathname !== "/follow" && location.pathname !== "/explore"
            ? "none"
            : "layout-header"
        }
      >
        <img src={logo} alt="" />
        <SharePopup />
      </header>
    </div>
  );
}
