---
description: Component Render Function
status: publish
gistId: ''
sync: false
createdAt: '2020-04-26T13:50:45.000Z'
updatedAt: '2020-04-26T13:55:35.000Z'
blobs:
  - filename: form.js
    code: |-
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
    language: jsx
  - filename: form.spec.js
    code: |-
      describe('Form', () => {
        it('should not submit the form with an empty value', () => {
          const submit = jest.fn();
          const { getByText } = render(<Form submit={submit} />);

          fireEvent.click(getByText('Submit'));

          expect(submit).toHaveBeenCalledTimes(0);
        });

        it('should submit the form with value', () => {
          const submit = jest.fn();
          const value = 'a value';
          const { getByText, getByLabelText } = render(<Form submit={submit} />);

          fireEvent.change(getByLabelText('Type'), { target: { value } });
          fireEvent.click(getByText('Submit'));

          expect(submit).toHaveBeenCalledTimes(1);
          expect(submit).toHaveBeenCalledWith(value);
        });
      });
    language: jsx
  - filename: renderForm.js
    code: |-
      const renderForm = props => {
        const { getByText, getByLabelText } = render(<Form {...props} />);

        const getButton = () => getByText('Submit');
        const getInput = () => getByLabelText('Type');

        const fireButtonClick = () => fireEvent.click(getButton());
        const fireInputChange = value => fireEvent.change(getInput(), { target: { value } });

        return { getButton, getInput, fireButtonClick, fireInputChange };
      };
    language: jsx
  - filename: Form-with-renderForm.spec.js
    code: |-
      describe('Form', () => {
        it('should not submit the form with an empty value', () => {
          const submit = jest.fn();
          const { fireButtonClick } = renderForm({ submit });

          fireButtonClick();

          expect(submit).toHaveBeenCalledTimes(0);
        });

        it('should submit the form with value', () => {
          const submit = jest.fn();
          const value = 'a value';
          const { fireInputChange, fireButtonClick } = renderForm({ submit });

          fireInputChange(value);
          fireButtonClick();

          expect(submit).toHaveBeenCalledTimes(1);
          expect(submit).toHaveBeenCalledWith(value);
        });
      });
    language: jsx
  - filename: Form-extra-test.spec.js
    code: |-
      it('should not submit the form if value changed to empty string', () => {
        const submit = jest.fn();
        const value = 'a value';
        const { fireInputChange, fireButtonClick } = renderForm({ submit });

        fireInputChange(value);
        fireInputChange('');
        fireButtonClick();

        expect(submit).toHaveBeenCalledTimes(0);
      });
    language: jsx
  - filename: renderForm-rtk.js
    code: |-
      const renderForm = createRender({
        defaultProps: () => ({ submit: jest.fn() }),
        component: Form,
        elements: queries => ({
          button: () => queries.getByText('Submit'),
          input: () => queries.getByLabelText('Type'),
        }),
        fire: elements => ({
          buttonClick: () => fireEvent.click(elements.button()),
          inputChange: value => fireEvent.change(elements.input(), { target: { value } }),
        }),
      });
    language: jsx
  - filename: Form-rtk.spec.js
    code: |-
      it('should not submit the form if value changed to empty string', () => {
        const value = 'a value';
        const { fire, props } = renderForm();

        fire.inputChange(value);
        fire.inputChange('');
        fire.buttonClick();

        expect(props.submit).toHaveBeenCalledTimes(0);
      });
    language: jsx
commits:
  - committedAt: '2020-04-26T17:55:35.000Z'
    description: Component Render Function
    blobs:
      - filename: form.js
        code: |-
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
        language: jsx
      - filename: form.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { getByText } = render(<Form submit={submit} />);

              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { getByText, getByLabelText } = render(<Form submit={submit} />);

              fireEvent.change(getByLabelText('Type'), { target: { value } });
              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
      - filename: renderForm.js
        code: |-
          const renderForm = props => {
            const { getByText, getByLabelText } = render(<Form {...props} />);

            const getButton = () => getByText('Submit');
            const getInput = () => getByLabelText('Type');

            const fireButtonClick = () => fireEvent.click(getButton());
            const fireInputChange = value => fireEvent.change(getInput(), { target: { value } });

            return { getButton, getInput, fireButtonClick, fireInputChange };
          };
        language: jsx
      - filename: Form-with-renderForm.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { fireButtonClick } = renderForm({ submit });

              fireButtonClick();

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { fireInputChange, fireButtonClick } = renderForm({ submit });

              fireInputChange(value);
              fireButtonClick();

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
      - filename: Form-extra-test.spec.js
        code: >-
          it('should not submit the form if value changed to empty string', ()
          => {
            const submit = jest.fn();
            const value = 'a value';
            const { fireInputChange, fireButtonClick } = renderForm({ submit });

            fireInputChange(value);
            fireInputChange('');
            fireButtonClick();

            expect(submit).toHaveBeenCalledTimes(0);
          });
        language: jsx
      - filename: renderForm-rtk.js
        code: |-
          const renderForm = createRender({
            defaultProps: () => ({ submit: jest.fn() }),
            component: Form,
            elements: queries => ({
              button: () => queries.getByText('Submit'),
              input: () => queries.getByLabelText('Type'),
            }),
            fire: elements => ({
              buttonClick: () => fireEvent.click(elements.button()),
              inputChange: value => fireEvent.change(elements.input(), { target: { value } }),
            }),
          });
        language: jsx
      - filename: Form-rtk.spec.js
        code: >-
          it('should not submit the form if value changed to empty string', ()
          => {
            const value = 'a value';
            const { fire, props } = renderForm();

            fire.inputChange(value);
            fire.inputChange('');
            fire.buttonClick();

            expect(props.submit).toHaveBeenCalledTimes(0);
          });
        language: jsx
  - committedAt: '2020-04-26T17:54:58.000Z'
    description: Component Render Function
    blobs:
      - filename: form.js
        code: |-
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
        language: jsx
      - filename: form.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { getByText } = render(<Form submit={submit} />);

              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { getByText, getByLabelText } = render(<Form submit={submit} />);

              fireEvent.change(getByLabelText('Type'), { target: { value } });
              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
      - filename: renderForm.js
        code: |-
          const renderForm = props => {
            const { getByText, getByLabelText } = render(<Form {...props} />);

            const getButton = () => getByText('Submit');
            const getInput = () => getByLabelText('Type');

            const fireButtonClick = () => fireEvent.click(getButton());
            const fireInputChange = value => fireEvent.change(getInput(), { target: { value } });

            return { getButton, getInput, fireButtonClick, fireInputChange };
          };
        language: jsx
      - filename: Form-with-renderForm.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { fireButtonClick } = renderForm({ submit });

              fireButtonClick();

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { fireInputChange, fireButtonClick } = renderForm({ submit });

              fireInputChange(value);
              fireButtonClick();

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
      - filename: Form-extra-test.spec.js
        code: >-
          it('should not submit the form if value changed to empty string', ()
          => {
            const submit = jest.fn();
            const value = 'a value';
            const { fireInputChange, fireButtonClick } = renderForm({ submit });

            fireInputChange(value);
            fireInputChange('');
            fireButtonClick();

            expect(submit).toHaveBeenCalledTimes(0);
          });
        language: jsx
      - filename: renderForm-rtk.js
        code: |-
          const renderForm = createRender({
            defaultProps: () => ({ submit: jest.fn() }),
            component: Form,
            elements: queries => ({
              button: () => queries.getByText('Submit'),
              input: () => queries.getByLabelText('Type'),
            }),
            fire: elements => ({
              buttonClick: () => fireEvent.click(elements.button()),
              inputChange: value => fireEvent.change(elements.input(), { target: { value } }),
            }),
          });
        language: jsx
  - committedAt: '2020-04-26T17:53:57.000Z'
    description: Component Render Function
    blobs:
      - filename: form.js
        code: |-
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
        language: jsx
      - filename: form.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { getByText } = render(<Form submit={submit} />);

              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { getByText, getByLabelText } = render(<Form submit={submit} />);

              fireEvent.change(getByLabelText('Type'), { target: { value } });
              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
      - filename: renderForm.js
        code: |-
          const renderForm = props => {
            const { getByText, getByLabelText } = render(<Form {...props} />);

            const getButton = () => getByText('Submit');
            const getInput = () => getByLabelText('Type');

            const fireButtonClick = () => fireEvent.click(getButton());
            const fireInputChange = value => fireEvent.change(getInput(), { target: { value } });

            return { getButton, getInput, fireButtonClick, fireInputChange };
          };
        language: jsx
      - filename: Form-with-renderForm.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { fireButtonClick } = renderForm({ submit });

              fireButtonClick();

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { fireInputChange, fireButtonClick } = renderForm({ submit });

              fireInputChange(value);
              fireButtonClick();

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
      - filename: Form-extra-test.spec.js
        code: >-
          it('should not submit the form if value changed to empty string', ()
          => {
            const submit = jest.fn();
            const value = 'a value';
            const { fireInputChange, fireButtonClick } = renderForm({ submit });

            fireInputChange(value);
            fireInputChange('');
            fireButtonClick();

            expect(submit).toHaveBeenCalledTimes(0);
          });
        language: jsx
  - committedAt: '2020-04-26T17:53:17.000Z'
    description: Component Render Function
    blobs:
      - filename: form.js
        code: |-
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
        language: jsx
      - filename: form.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { getByText } = render(<Form submit={submit} />);

              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { getByText, getByLabelText } = render(<Form submit={submit} />);

              fireEvent.change(getByLabelText('Type'), { target: { value } });
              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
      - filename: renderForm.js
        code: |-
          const renderForm = props => {
            const { getByText, getByLabelText } = render(<Form {...props} />);

            const getButton = () => getByText('Submit');
            const getInput = () => getByLabelText('Type');

            const fireButtonClick = () => fireEvent.click(getButton());
            const fireInputChange = value => fireEvent.change(getInput(), { target: { value } });

            return { getButton, getInput, fireButtonClick, fireInputChange };
          };
        language: jsx
      - filename: Form-with-renderForm.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { fireButtonClick } = renderForm({ submit });

              fireButtonClick();

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { fireInputChange, fireButtonClick } = renderForm({ submit });

              fireInputChange(value);
              fireButtonClick();

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
  - committedAt: '2020-04-26T17:52:07.000Z'
    description: Component Render Function
    blobs:
      - filename: form.js
        code: |-
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
        language: jsx
      - filename: form.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { getByText } = render(<Form submit={submit} />);

              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { getByText, getByLabelText } = render(<Form submit={submit} />);

              fireEvent.change(getByLabelText('Type'), { target: { value } });
              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
      - filename: renderForm.js
        code: |-
          const renderForm = props => {
            const { getByText, getByLabelText } = render(<Form {...props} />);

            const getButton = () => getByText('Submit');
            const getInput = () => getByLabelText('Type');

            const fireButtonClick = () => fireEvent.click(getButton());
            const fireInputChange = value => fireEvent.change(getInput(), { target: { value } });

            return { getButton, getInput, fireButtonClick, fireInputChange };
          };
        language: jsx
  - committedAt: '2020-04-26T17:51:33.000Z'
    description: Component Render Function
    blobs:
      - filename: form.js
        code: |-
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
        language: jsx
      - filename: form.spec.js
        code: |-
          describe('Form', () => {
            it('should not submit the form with an empty value', () => {
              const submit = jest.fn();
              const { getByText } = render(<Form submit={submit} />);

              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(0);
            });

            it('should submit the form with value', () => {
              const submit = jest.fn();
              const value = 'a value';
              const { getByText, getByLabelText } = render(<Form submit={submit} />);

              fireEvent.change(getByLabelText('Type'), { target: { value } });
              fireEvent.click(getByText('Submit'));

              expect(submit).toHaveBeenCalledTimes(1);
              expect(submit).toHaveBeenCalledWith(value);
            });
          });
        language: jsx
  - committedAt: '2020-04-26T17:50:45.000Z'
    description: Component Render Function
    blobs:
      - filename: form.js
        code: |-
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
        language: jsx
---

