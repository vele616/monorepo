import FlexSearch from 'flexsearch';

const searchTerms = {
  JUNIOR: ['junior'],
  MID: ['mid'],
  SENIOR: ['senior'],
  LEAD: ['team lead', 'head', 'principal'],
  FULLTIME: ['full time', 'full-time'],
  PARTTIME: ['part time', 'part-time'],
  CONTRACT: ['contract', 'freelance'],
};

class SearchIndex {
  constructor(index, store) {
    this.store = store;
    this.index = new FlexSearch({
      encode: 'balance',
      tokenize: 'full',
      threshold: 1,
      cache: true,
    });
    this.index.import(index);
  }

  search(query = '', seniority = [], contractType = [], tags = []) {
    if (
      !query &&
      seniority.length === 0 &&
      contractType.length === 0 &&
      tags.length === 0
    ) {
      return Object.values(this.store);
    }

    const prepareSearchQuery = (query, seniority, contractType) => {
      if (seniority.length === 0 && contractType.length === 0) {
        return [[query, null, null]];
      } else if (contractType.length === 0) {
        return seniority.map((s) => [query, s]);
      } else if (seniority.length === 0) {
        return contractType.map((c) => [query, null, c]);
      } else {
        return seniority.map((s) => contractType.flatMap((c) => [query, s, c]));
      }
    };

    const createSearchQuery = (query, seniority, contractType) => {
      const s = searchTerms[seniority];
      const c = searchTerms[contractType];

      if (!seniority && !contractType) {
        return [query];
      } else if (!contractType) {
        return s.map((sterm) => `${sterm} ${query}`);
      } else if (!seniority) {
        return c.map((cterm) => `${cterm} ${query}`);
      } else {
        return s.flatMap((sterm) =>
          c.flatMap((cterm) => `${sterm} ${cterm} ${query}`)
        );
      }
    };

    const mergeSorted = (firstArray, secondArray) => {
      const merge = (firstArray, secondArray) => {
        return [
          ...secondArray.flatMap((t, i) => [t, firstArray[i]]),
          ...firstArray.slice(secondArray.length),
        ];
      };

      if (firstArray.length > secondArray.length) {
        return merge(firstArray, secondArray);
      } else {
        return merge(secondArray, firstArray);
      }
    };

    if (query === '' && !seniority && !contractType && tags.length !== 0) {
      return Object.values(this.store).filter(
        (x) => tags.length === 0 || tags.some((t) => x.hashtags.includes(t))
      );
    }

    return prepareSearchQuery(query, seniority, contractType)
      .flatMap((r) => createSearchQuery(...r))
      .map((q) => this.index.search({ query: q, threshold: 2 }))
      .reduce(mergeSorted)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((t) => this.store[t])
      .filter(
        (x) => tags.length === 0 || tags.some((t) => x.hashtags.includes(t))
      );
  }
}

export default SearchIndex;
