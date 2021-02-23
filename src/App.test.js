import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("/api/create-form", (req, res, ctx) => {
    return res(ctx.json({ status: "this should not be triggered" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('name input component properly sets form state', () => {
  render(<App />);
  fireEvent.change(screen.getByRole("name-input"), { target: { value: 'test test' } })
  expect(screen.getByRole("name-text")).toHaveTextContent(
    "name: test test"
  );
});

test('date input properly sets form state', () => {
  render(<App />);
  fireEvent.change(screen.getByRole("date-input"), { target: { value: "2020-02-22" } });
  expect(screen.getByRole("date-text")).toHaveTextContent(
    "birthday is: 2020-02-22"
  );
})

test ('color dropdown selection and adding new colors', async () => {
  render(<App />);

  fireEvent.click(screen.getByRole("color-dropdown-toggle"));
  fireEvent.click(screen.getByText("Blue"));
  expect(screen.getByRole("color-text")).toHaveTextContent(
    "favorite color: Blue"
  );

  fireEvent.click(screen.getByRole("color-dropdown-toggle"));
  fireEvent.change(screen.getByRole("add-color-input"), { target: { value: "teal" } });
  await waitFor(() => fireEvent.click(screen.getByText("Add Color")));
  expect(screen.getByRole("color-text")).toHaveTextContent(
    "favorite color: teal"
  );
  expect(screen.getByRole("color-select-teal")).toHaveTextContent("teal")
})

test ('submitting form can properly send POST request', async () => {
  server.use(
    rest.post("/api/create-form", ({ body }, res, ctx) => {
      console.log("req", body)
      const {name, date, color} = body
      expect(name).toEqual("test test")
      expect(date).toEqual("2020-02-22");
      expect(color).toEqual("Blue");
      return res(ctx.json({ status: "success" }));
    })
  );

  render(<App />);
  
  fireEvent.change(screen.getByRole("name-input"), {
    target: { value: "test test" },
  });
  fireEvent.change(screen.getByRole("date-input"), {
    target: { value: "2020-02-22" },
  });
  fireEvent.click(screen.getByRole("color-dropdown-toggle"));
  fireEvent.click(screen.getByText("Blue"));

  fireEvent.click(screen.getByRole("submit-user-form"))

  await waitFor(() => screen.getByText("Status: success"))
})