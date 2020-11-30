import React from "react";
import Pagination from "./index";

export default {
  title: "Components/Pagination",
  component: Pagination,
};

const Template = () => (
  <>
    <p />
    <Pagination pageCount={3} />
    <p />
    <Pagination pageCount={7} />
    <p />
    <Pagination pageCount={17} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {};
