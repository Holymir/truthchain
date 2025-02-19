const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("TruthChain Contract", function () {
  let TruthChain, truthChain, owner, addr1, addr2, addr3;

  beforeEach(async function () {
    TruthChain = await ethers.getContractFactory("TruthChain");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    truthChain = await TruthChain.deploy();
  });

  it("Should allow a user to submit a fact", async function () {
    const factContent = "The Earth orbits the Sun.";
    await expect(truthChain.connect(addr1).submitFact(factContent))
      .to.emit(truthChain, "FactSubmitted");
  });

  it("Should allow reputable users to vote on facts", async function () {
    const factContent = "Blockchain is decentralized.";
    await truthChain.connect(addr1).submitFact(factContent);
    const factHash = ethers.solidityPackedKeccak256(
      ["string", "address", "uint256"],
      [factContent, addr1.address, (await ethers.provider.getBlock("latest")).timestamp]
    );

    await truthChain.connect(owner).increaseReputation(addr2.address);
    await expect(truthChain.connect(addr2).voteFact(factHash, true))
      .to.emit(truthChain, "VoteCasted");
  });

  it("Should not allow non-reputable users to vote", async function () {
    const factContent = "AI can improve human decision-making.";
    await truthChain.connect(addr1).submitFact(factContent);
    const factHash = ethers.solidityPackedKeccak256(
      ["string", "address", "uint256"],
      [factContent, addr1.address, (await ethers.provider.getBlock("latest")).timestamp]
    );

    await expect(truthChain.connect(addr3).voteFact(factHash, true))
      .to.be.revertedWith("Insufficient reputation");
  });

  it("Should verify a fact when enough votes are cast", async function () {
    const factContent = "The Moon affects Earth's tides.";
    await truthChain.connect(addr1).submitFact(factContent);
    const factHash = ethers.solidityPackedKeccak256(
      ["string", "address", "uint256"],
      [factContent, addr1.address, (await ethers.provider.getBlock("latest")).timestamp]
    );

    await truthChain.connect(owner).increaseReputation(addr2.address);
    await truthChain.connect(owner).increaseReputation(addr3.address);
    await truthChain.connect(owner).increaseReputation(owner.address);

    await truthChain.connect(addr2).voteFact(factHash, true);
    await truthChain.connect(addr3).voteFact(factHash, true);
    await truthChain.connect(owner).voteFact(factHash, true);

    await expect(truthChain.connect(owner).verifyFact(factHash))
      .to.emit(truthChain, "FactVerified");
  });
});