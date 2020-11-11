/* eslint-disable import/no-extraneous-dependencies */
import initStoryshots from "@storybook/addon-storyshots";
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer";
import path from "path";

// function to customize the snapshot location
const getMatchOptions = ({ context: { fileName, id } }) => {
  // Generates a custom path based on the file name and the custom directory.
  const snapshotPath = path.join(
    "./src/components/",
    path.dirname(fileName),
    "__visuals__"
  );

  return { customSnapshotsDir: snapshotPath, customSnapshotIdentifier: id };
};

initStoryshots({
  framework: "react",
  suite: "Visual Testing",
  test: imageSnapshot({
    getMatchOptions,
  }),
  storyKindRegex: /^((?!.*?Examples).)*$/, // exclude examples as they might change
});
