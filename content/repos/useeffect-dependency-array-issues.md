---
description: useEffect dependency array issues
status: publish
gistId: ''
sync: false
createdAt: '2020-07-03T13:31:45.000Z'
updatedAt: '2020-07-03T13:34:17.000Z'
blobs:
  - filename: useEffect-issue.js
    code: |-
      useEffect(() => {
        refreshCart();
      }, []);
    language: js
  - filename: refreshCart.js
    code: |-
      const refreshCart = () =>
        api.getCart().then(cart => setState(cart));
    language: js
  - filename: refreshCart-useCallback.js
    code: |-
      const refreshCart = useCallback(
        () => api.getCart().then(cart => setState(cart)),
        [],
      );
    language: js
  - filename: refreshCartRef.js
    code: |-
      const refreshCartRef = useRef(null);

      if (!refreshCartRef.current) {
        refreshCartRef.current = () =>
          api.getCart().then(cart => setState(cart));
      }

      useEffect(() => refreshCartRef.current(), []);
    language: js
  - filename: refreshCart-eslint-disable.js
    code: |-
      useEffect(() => {
        refreshCart();
        // refreshCart is recreated fresh, but we only want to
        // do this on initial render, so we're going to provide
        // an empty array here so it only runs once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    language: js
commits:
  - committedAt: '2020-07-03T17:34:17.000Z'
    description: useEffect dependency array issues
    blobs:
      - filename: useEffect-issue.js
        code: |-
          useEffect(() => {
            refreshCart();
          }, []);
        language: js
      - filename: refreshCart.js
        code: const refreshCart = () => api.getCart().then(cart => setState(cart));
        language: js
      - filename: refreshCart-useCallback.js
        code: |-
          const refreshCart = useCallback(
            () => api.getCart().then(cart => setState(cart)),
            [],
          );
        language: js
      - filename: refreshCartRef.js
        code: |-
          const refreshCartRef = useRef(null);

          if (!refreshCartRef.current) {
            refreshCartRef.current = () =>
              api.getCart().then(cart => setState(cart));
          }

          useEffect(() => refreshCartRef.current(), []);
        language: js
      - filename: refreshCart-eslint-disable.js
        code: |-
          useEffect(() => {
            refreshCart();
          // refreshCart is recreated fresh, but we only want to
          // do this on initial render, so we're going to provide
          // an empty array here so it only runs once.
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
        language: js
  - committedAt: '2020-07-03T17:33:28.000Z'
    description: useEffect dependency array issues
    blobs:
      - filename: useEffect-issue.js
        code: |-
          useEffect(() => {
            refreshCart();
          }, []);
        language: js
      - filename: refreshCart.js
        code: const refreshCart = () => api.getCart().then(cart => setState(cart));
        language: js
      - filename: refreshCart-useCallback.js
        code: |-
          const refreshCart = useCallback(
            () => api.getCart().then(cart => setState(cart)),
            [],
          );
        language: js
      - filename: refreshCartRef.js
        code: |-
          const refreshCartRef = useRef(null);

          if (!refreshCartRef.current) {
            refreshCartRef.current = () =>
              api.getCart().then(cart => setState(cart));
          }

          useEffect(() => refreshCartRef.current(), []);
        language: js
  - committedAt: '2020-07-03T17:32:41.000Z'
    description: useEffect dependency array issues
    blobs:
      - filename: useEffect-issue.js
        code: |-
          useEffect(() => {
            refreshCart();
          }, []);
        language: js
      - filename: refreshCart.js
        code: const refreshCart = () => api.getCart().then(cart => setState(cart));
        language: js
      - filename: refreshCart-useCallback.js
        code: |-
          const refreshCart = useCallback(
            () => api.getCart().then(cart => setState(cart)),
            [],
          );
        language: js
  - committedAt: '2020-07-03T17:31:46.000Z'
    description: useEffect dependency array issues
    blobs:
      - filename: useEffect-issue.js
        code: |-
          useEffect(() => {
            refreshCart();
          }, []);
        language: js
      - filename: refreshCart.js
        code: const refreshCart = () => api.getCart().then(cart => setState(cart));
        language: js
  - committedAt: '2020-07-03T17:30:36.000Z'
    description: useEffect dependency array issues
    blobs:
      - filename: useEffect-refreshCart.js
        code: |-
          useEffect(() => {
            refreshCart();
          }, []);
        language: js
---

