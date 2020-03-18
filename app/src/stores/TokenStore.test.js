import TokenStore from "./TokenStore";

describe("TokenStore", () => {
  describe("setup", () => {
    it("sets owner and fetches tokens", async () => {
      const mockTokenInstance = {
        tokensOf: jest.fn().mockReturnValue([]),
        owner: jest.fn().mockReturnValue("test")
      };
      const mockContractsStore = {
        tokenInstance: mockTokenInstance
      };

      const tokenStore = new TokenStore(mockContractsStore);
      await tokenStore.setup();
      expect(tokenStore.owner).toEqual("test");
      expect(mockTokenInstance.tokensOf).toBeCalledWith("test");
    });
  });

  describe("fetchTokens", async () => {
    const mockTokenInstance = {
      tokensOf: jest.fn().mockReturnValue([0]),
      getGradient: jest.fn().mockReturnValue(["#000", "#fff"]),
      owner: jest.fn().mockReturnValue("test")
    };
    const mockContractsStore = {
      tokenInstance: mockTokenInstance
    };

    const tokenStore = new TokenStore(mockContractsStore);
    await tokenStore.fetchTokens();
    expect(tokenStore.tokens[0].gradient[0]).toEqual("#000");
    expect(tokenStore.tokens[0].gradient[1]).toEqual("#fff");
  });

  describe("mintToken", async () => {
    const mockTokenInstance = {
      tokensOf: jest.fn().mockReturnValue([]),
      mint: jest.fn(),
      owner: jest.fn()
    };
    const mockContractsStore = {
      tokenInstance: mockTokenInstance
    };

    const tokenStore = new TokenStore(mockContractsStore);
    await tokenStore.mintToken();
    expect(tokenStore.tokens).toHaveLength(1);
  });
});
