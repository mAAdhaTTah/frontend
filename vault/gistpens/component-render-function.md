---
tags:
  - web
  - snippet
title: Component Render Function
description: ""
slug: gistpens/component-render-function
published_at: 2020-04-26T13:50:45.000Z
updated_at: 2020-04-26T13:55:35.000Z
share: true
---

```jsx title="form.js"
import React from 'react';

export const Form = ({ submit }) => {
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === '') return;
    submit(value);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="input">Type</form>
      <input id="input" value={value} onChange={e => setValue(e.target.value)} />
      <button>Submit</button>
    </form>
  );
};
```

^form-js

```jsx title="form.spec.js"
describe("Form", () => {
  it("should not submit the form with an empty value", () => {
    const submit = jest.fn();
    const { getByText } = render(<Form submit={submit} />);

    fireEvent.click(getByText("Submit"));

    expect(submit).toHaveBeenCalledTimes(0);
  });

  it("should submit the form with value", () => {
    const submit = jest.fn();
    const value = "a value";
    const { getByText, getByLabelText } = render(<Form submit={submit} />);

    fireEvent.change(getByLabelText("Type"), { target: { value } });
    fireEvent.click(getByText("Submit"));

    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith(value);
  });
});
```

^form-spec-js

```jsx title="renderForm.js"
const renderForm = (props) => {
  const { getByText, getByLabelText } = render(<Form {...props} />);

  const getButton = () => getByText("Submit");
  const getInput = () => getByLabelText("Type");

  const fireButtonClick = () => fireEvent.click(getButton());
  const fireInputChange = (value) =>
    fireEvent.change(getInput(), { target: { value } });

  return { getButton, getInput, fireButtonClick, fireInputChange };
};
```

^renderForm-js

```jsx title="Form-with-renderForm.spec.js"
describe("Form", () => {
  it("should not submit the form with an empty value", () => {
    const submit = jest.fn();
    const { fireButtonClick } = renderForm({ submit });

    fireButtonClick();

    expect(submit).toHaveBeenCalledTimes(0);
  });

  it("should submit the form with value", () => {
    const submit = jest.fn();
    const value = "a value";
    const { fireInputChange, fireButtonClick } = renderForm({ submit });

    fireInputChange(value);
    fireButtonClick();

    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith(value);
  });
});
```

^Form-with-renderForm-spec-js

```jsx title="Form-extra-test.spec.js"
it("should not submit the form if value changed to empty string", () => {
  const submit = jest.fn();
  const value = "a value";
  const { fireInputChange, fireButtonClick } = renderForm({ submit });

  fireInputChange(value);
  fireInputChange("");
  fireButtonClick();

  expect(submit).toHaveBeenCalledTimes(0);
});
```

^Form-extra-test-spec-js

```jsx title="renderForm-rtk.js"
const renderForm = createRender({
  defaultProps: () => ({ submit: jest.fn() }),
  component: Form,
  elements: (queries) => ({
    button: () => queries.getByText("Submit"),
    input: () => queries.getByLabelText("Type"),
  }),
  fire: (elements) => ({
    buttonClick: () => fireEvent.click(elements.button()),
    inputChange: (value) =>
      fireEvent.change(elements.input(), { target: { value } }),
  }),
});
```

^renderForm-rtk-js

```jsx title="Form-rtk.spec.js"
it("should not submit the form if value changed to empty string", () => {
  const value = "a value";
  const { fire, props } = renderForm();

  fire.inputChange(value);
  fire.inputChange("");
  fire.buttonClick();

  expect(props.submit).toHaveBeenCalledTimes(0);
});
```

^Form-rtk-spec-js
