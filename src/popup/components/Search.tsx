import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

export interface SearchProps extends HTMLAttributes<HTMLDivElement> {}

export default function Search({ ...props }: SearchProps) {
  return (
    <div
      css={css`
        .searchbar {
          font-size: 14px;
          font-family: arial, sans-serif;
          color: #202124;
          display: flex;
          height: 44px;
          background: white;
          border: 1px solid #dfe1e5;
          box-shadow: none;
          border-radius: 24px;
          margin: 0 auto;
        }

        .searchbar:hover {
          box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
          border-color: rgba(223, 225, 229, 0);
        }

        .searchbar-wrapper {
          flex: 1;
          display: flex;
          padding: 5px 8px 0 14px;
        }

        .searchbar-left {
          font-size: 14px;
          font-family: arial, sans-serif;
          color: #202124;
          display: flex;
          align-items: center;
          padding-right: 13px;
          margin-top: -5px;
        }

        .search-icon-wrapper {
          margin: auto;
        }

        .search-icon {
          margin-top: 3px;
          color: #9aa0a6;
          height: 20px;
          line-height: 20px;
          width: 20px;
        }

        .searchbar-icon {
          display: inline-block;
          fill: currentColor;
          height: 24px;
          line-height: 24px;
          position: relative;
          width: 24px;
        }

        .searchbar-center {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
        }

        .searchbar-input-spacer {
          color: transparent;
          flex: 100%;
          white-space: pre;
          height: 34px;
          font-size: 16px;
        }

        .searchbar-input {
          background-color: transparent;
          border: none;
          margin: 0;
          padding: 0;
          color: rgba(0, 0, 0, 0.87);
          word-wrap: break-word;
          outline: none;
          display: flex;
          flex: 100%;
          margin-top: -37px;
          height: 34px;
          font-size: 16px;
        }

        .searchbar-right {
          display: flex;
          flex: 0 0 auto;
          margin-top: -5px;
          align-items: stretch;
          flex-direction: row;
        }

        .searchbar-clear-icon {
          margin-right: 12px;
        }
      `}
      {...props}
    >
      <div className="searchbar">
        <div className="searchbar-wrapper">
          <div className="searchbar-left">
            <div className="search-icon-wrapper">
              <span className="search-icon searchbar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
            </div>
          </div>

          <div className="searchbar-center">
            <div className="searchbar-input-spacer"></div>

            <input
              className="searchbar-input"
              title="Search"
              placeholder="Search Google"
            />
          </div>

          <div className="searchbar-right"></div>
        </div>
      </div>
    </div>
  );
}
