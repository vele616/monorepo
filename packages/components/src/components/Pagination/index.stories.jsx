import React, { useRef } from "react";
import Pagination from "./index";

export default {
  title: "Components/Pagination",
  component: Pagination,
};

export const Default = Pagination.bind();

export const SmallPagination = Pagination.bind();
SmallPagination.storyName = "Small pagination";
SmallPagination.parameters = {
  docs: {
    description: {
      story: `This story shows pagination with 5 pages. All are displayed because visible count is
      greater than 5. If all pages are visible, pagination will move green line under selected page number.`,
    },
  },
};
SmallPagination.args = {
  pageCount: 5,
  visibleCount: 10,
};

export const LargePagination = Pagination.bind();
LargePagination.storyName = "Large pagination";
LargePagination.parameters = {
  docs: {
    description: {
      story: `This story shows pagination with 15 pages. All are displayed because visible count is
      greater or equal than 15. If all pages are visible, pagination will move green line under selected page number.`,
    },
  },
};
LargePagination.args = {
  pageCount: 15,
  visibleCount: 15,
};

export const WithControlsSmall = Pagination.bind();
WithControlsSmall.storyName = "With Controls Small";
WithControlsSmall.parameters = {
  docs: {
    description: {
      story: `This story shows pagination with 10 pages. All cannot be displayed because visible count is
      less than 10. This pagination will render controls for selecting previous or next page if currently selected
      page is greater than 1 or less than total number of pages respectively. Pages number will change when currently
      selected page number can display at least half of total visible elements (floored). 
      <ul>For example: if visible count is 5 and total number of pages is 7: 
      Floored half of visible count is 2.
      <li>Page 1 is selected - cannot show 2 previous pages, start from 1 and display 5 next elements</li> (1,2,3,4,5)
      <li>Page 2 is selected - cannot show 2 previous pages, start from 1 and display 5 next elements</li> (1,2,3,4,5)
      <li>Page 3 is selected - can show 2 previous and next pages, start from (3-2=1) and display next 2 elements</li> (1,2,3,4,5)
      <li>Page 4 is selected - can show 2 previous and next pages, start from (4-2=2) and display next 2 elements</li> (2,3,4,5,6)
      <li>Page 5 is selected - can show 2 previous and next pages, start from (5-2=3) and display next 2 elements</li> (3,4,5,6,7)
      <li>Page 6 is selected - cannot show 2 next pages, start from 3 and display 5 next elements</li> (3,4,5,6,7)
      <li>Page 7 is selected - cannot show 2 next pages, start from 3 and display 5 next elements</li> (3,4,5,6,7)
      </ul>
      `,
    },
  },
};
WithControlsSmall.args = {
  pageCount: 7,
  visibleCount: 5,
};

export const WithControlsLarge = Pagination.bind();
WithControlsLarge.storyName = "With Controls Large";
WithControlsLarge.parameters = {
  docs: {
    description: {
      story: `Same as Small Pagination with controls but with more pages.`,
    },
  },
};
WithControlsLarge.args = {
  pageCount: 50,
  visibleCount: 7,
};

export const Controlled = (args) => {
  const paginationRef = useRef();

  return (
    <div>
      <Pagination forwardRef={paginationRef} {...args} />
      <div>
        <button onClick={() => paginationRef.current.changePage(5)}>
          Select Page 5
        </button>
        <button onClick={() => paginationRef.current.changePage(10)}>
          Select Page 10
        </button>
        <button onClick={() => paginationRef.current.changePage(20)}>
          Select Page 20
        </button>
      </div>
    </div>
  );
};

Controlled.storyName = "Controlled";
Controlled.parameters = {
  docs: {
    description: {
      story: `This story shows that Pagination component can be controlled from outside by
      exposing functions through forwardRef argument. Clicking on buttons 5 and 10 will lead to page 5 and 10.
      Page 20 does not exists, therefore, pagination won't change current page if button 20 is clicked.`,
    },
  },
};
Controlled.args = {
  pageCount: 12,
  visibleCount: 7,
};
