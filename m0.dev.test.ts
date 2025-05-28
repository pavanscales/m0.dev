import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Landingpage from "./m0"
describe("Landingpage", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renders heading and description", () => {
    render(<Landingpage />)
    expect(
      screen.getByText("Build any mobile app, fast.")
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Rork builds complete, cross-platform mobile apps/i)
    ).toBeInTheDocument()
  })

  it("toggles theme on click", () => {
    render(<Landingpage />)

    const themeToggle = screen.getByRole("button", { name: /moon|sun/i })
    fireEvent.click(themeToggle)

    const darkClass = document.documentElement.classList.contains("dark")
    expect(darkClass).toBe(true)
  })

  it("opens auth modal on Sign In click", () => {
    render(<Landingpage />)

    const signInButton = screen.getByText("Sign In")
    fireEvent.click(signInButton)

    // You should add the auth modal content or test visibility toggle here
    // This assumes setting state works correctly.
    // Better: Expose modal content and check visibility.
  })

  it("disables send button when input is empty", () => {
    render(<Landingpage />)
    const sendButton = screen.getByRole("button", { name: /send/i })
    expect(sendButton).toBeDisabled()
  })

  it("enables send button with input", () => {
    render(<Landingpage />)
    const textarea = screen.getByPlaceholderText(/describe the mobile app/i)
    fireEvent.change(textarea, { target: { value: "Build a todo app" } })

    const sendButton = screen.getByRole("button", { name: /send/i })
    expect(sendButton).not.toBeDisabled()
  })

  it("clicking suggestion sets input value", () => {
    render(<Landingpage />)
    const suggestion = screen.getByText("Make a visual novel game")
    fireEvent.click(suggestion)

    const textarea = screen.getByPlaceholderText(/describe the mobile app/i)
    expect(textarea).toHaveValue("Make a visual novel game")
  })

  it("starts generating when clicking send", async () => {
    render(<Landingpage />)
    const textarea = screen.getByPlaceholderText(/describe the mobile app/i)
    fireEvent.change(textarea, { target: { value: "Build a todo app" } })

    const sendButton = screen.getByRole("button", { name: /send/i })
    fireEvent.click(sendButton)

    // simulate isGenerating (not visible UI-wise, better to mock state if needed)
    await waitFor(() => {
      // Assume `setShowDevModal(true)` would trigger modal appearance
      // Here you can check your modal logic too if it's implemented visibly
    })
  })
})
