import React from "react";

type Props = {};

const Title = (props: { title: string }) => {
  return <h2 className="text-2xl font-extrabold uppercase tracking-widest mb-5">{props.title}</h2>;
};

export default Title;
