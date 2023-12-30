import React from "react";

import { ArrowIcon } from "./icons";

interface TitleProps {
  title: string;
  subTitle?: string;
}

const Title = (props: TitleProps) => {
  const { title, subTitle } = props;

  return (
    <div className="flex gap-3 items-center mb-5">
      <h2 className="text-2xl font-extrabold uppercase tracking-widest">
        {title}
      </h2>
      {subTitle && (
        <div className="flex gap-3 items-center">
          <ArrowIcon />
          <h3 className="text-blue font-bold">{subTitle}</h3>
        </div>
      )}
    </div>
  );
};

export default Title;
