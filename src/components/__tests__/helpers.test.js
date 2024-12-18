import { isAuthenticated } from "../../services/helpers"

describe("Helper Functions", () => {
  it("returns true if access token is present", () => {
    localStorage.setItem("access_token", "dummy_token")
    expect(isAuthenticated()).toBe(true)
  })

  it("returns false if access token is not present", () => {
    localStorage.removeItem("access_token")
    expect(isAuthenticated()).toBe(false)
  })
})
