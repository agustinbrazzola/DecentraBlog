const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("DecentraBlog", async function () {
  it("Should create a post", async function () {
    const DecentraBlog = await ethers.getContractFactory("DecentraBlog")
    const decentraBlog = await DecentraBlog.deploy()
    await decentraBlog.deployed()
    await decentraBlog.createPost("My first post", "12345")

    const posts = await decentraBlog.fetchPosts()
    expect(posts[0].title).to.equal("My first post")
  })

  it("Should edit a post", async function () {
    const DecentraBlog = await ethers.getContractFactory("DecentraBlog")
    const decentraBlog = await DecentraBlog.deploy()
    await decentraBlog.deployed()
    await decentraBlog.createPost("My Second post", "12345")

    await decentraBlog.updatePost(1, "My updated post", "23456", true)

    posts = await decentraBlog.fetchPosts()
    expect(posts[0].title).to.equal("My updated post")
  })

  it("Should add update the name", async function () {
    const DecentraBlog = await ethers.getContractFactory("DecentraBlog")
    const decentraBlog = await DecentraBlog.deploy()
    await decentraBlog.deployed()

    expect(await decentraBlog.name()).to.equal("DecentraBlog")
    await decentraBlog.updateName('CentraBlog')
    expect(await decentraBlog.name()).to.equal("CentraBlog")
  })
})