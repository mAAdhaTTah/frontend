const fetchPosts = async ({ graphql, query, modify, page = 1, pages = [] }) => {
  const results = await graphql(query, { skip: (page - 1) * 10 });

  if (results.errors) {
    const message = results.errors.map(error => error.message).join('\n\n');
    throw new Error(message);
  }

  const { add, hasNextPage } = await modify(results, { page });

  pages = [...pages, ...add];

  return hasNextPage
    ? fetchPosts({ graphql, query, modify, page: page + 1, pages })
    : pages;
};

export default (query, modify) => async ({ actions, graphql }) => {
  const { createPage } = actions;
  const pages = await fetchPosts({ graphql, query, modify });

  pages.forEach(page => {
    createPage(page);
  });
};
