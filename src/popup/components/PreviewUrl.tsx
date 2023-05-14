import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

export type UrlData = Partial<{
  url: string;
  mediaType: string;
  contentType: string | undefined;
  favicons: string[];
  title: string;
  siteName: string | undefined;
  description: string | undefined;
  images: string[];
  videos: {
    url: string | undefined;
    secureUrl: string | null | undefined;
    type: string | null | undefined;
    width: string | undefined;
    height: string | undefined;
  }[];
}>;

export interface PreviewUrlProps extends HTMLAttributes<HTMLDivElement> {
  data: UrlData;
}

export default function PreviewUrl({ data, ...props }: PreviewUrlProps) {
  if (!data) {
    return null;
  }
  return (
    <div
      {...props}
      css={css`
        .header {
          display: grid;
          grid-template-columns: 400px 50px;
          align-items: center;
        }

        .title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
        }

        .description {
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .favicon {
          height: 20px;
          width: 20px;
          object-fit: cover;
        }

        .previewImg {
          height: 200px;
          width: 100%;
          object-fit: contain;
        }
      `}
    >
      <a href={data?.url} target="_blank">
        <header className="header">
          <h4 className="title">{data?.title}</h4>
          <img src={data?.favicons?.[0]} alt="favicon" className="favicon" />
        </header>
        <p className="description">{data?.description}</p>
        <img src={data?.images?.[0]} alt="previewImg" className="previewImg" />
      </a>
    </div>
  );
}
