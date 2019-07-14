const fetchPosts = async ({ graphql, query, modify, page = 1, pages = [] }) => {
  const { add, hasNextPage } = modify(
    await graphql(query, { skip: (page - 1) * 10 }),
    { page }
  );

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
