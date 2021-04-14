const compareTwoStrings = (first, second) => {
  first = first.replace(/\s+/g, "");
  second = second.replace(/\s+/g, "");

  if (!first.length && !second.length) return 1;
  if (!first.length || !second.length) return 0;
  if (first === second) return 1;
  if (first.length === 1 && second.length === 1) return 0;
  if (first.length < 2 || second.length < 2) return 0;

  let firstBigrams = new Map();
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

    firstBigrams.set(bigram, count);
  }

  let intersectionSize = 0;
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2);
};

const findSimilarPosts = (post, targetPosts) => {
  // { title, description, excerpt, id }
  const ratings = [];

  for (let i = 0; i < targetPosts.length; i++) {
    const currentTargetPost = targetPosts[i];
    const currentRating = {
      title: compareTwoStrings(post.title, currentTargetPost.title),
      description: compareTwoStrings(
        post.description,
        currentTargetPost.description
      ),
      excerpt: compareTwoStrings(post.excerpt, currentTargetPost.excerpt),
      id: currentTargetPost.id,
    };
    const a = 0.5;
    const b = Math.random() * (1 - a);
    const c = 1 - a - b;
    const variables = [a, b, c];
    variables.sort((a, b) => b - a);
    currentRating.total =
      variables[2] * currentRating.title +
      variables[1] * currentRating.description +
      variables[0] * currentRating.excerpt;
    ratings.push(currentRating);
  }

  ratings.sort((a, b) => a.total - b.total);

  return { ratings, bestMatches: ratings.slice(0, 3) };
};

const findBestMatch = (mainString, targetStrings) => {
  if (!areArgsValid(mainString, targetStrings))
    throw new Error(
      "Bad arguments: First argument should be a string, second should be an array of strings"
    );

  const ratings = [];

  for (let i = 0; i < targetStrings.length; i++) {
    const currentTargetString = targetStrings[i];
    const currentRating = compareTwoStrings(mainString, currentTargetString);
    ratings.push({ target: currentTargetString, rating: currentRating });
  }

  ratings.sort((a, b) => a.rating - b.rating);

  return { ratings, bestMatches: ratings.slice(0, 3) };
};

function areArgsValid(mainString, targetStrings) {
  if (typeof mainString !== "string") return false;
  if (!Array.isArray(targetStrings)) return false;
  if (!targetStrings.length) return false;
  if (targetStrings.find((s) => typeof s !== "string")) return false;
  return true;
}

module.exports = {
  findSimilarPosts,
};
