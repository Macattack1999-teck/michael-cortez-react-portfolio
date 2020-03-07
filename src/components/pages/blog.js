import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios'
import BlogItem from "../blog/blog-item"
import BlogModal from "../modals/blog-modal"

export default class Blog extends Component {
  constructor() {
    super()

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalIsOpen: false
    }

    this.getBlogItems = this.getBlogItems.bind(this)
    this.onScroll = this.onScroll.bind(this)
    window.addEventListener("scroll", this.onScroll, false)
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true
    })
  }

  handleModalClose() {
    this.setState({
      blogModalIsOpen: false
    })
  }
  
  onScroll() {
    if ( this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
      return;
    }

    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      this.getBlogItems()
    }
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1
    })

    axios.get(`https://michaelcortez.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, { withCredentials: true }).then(response => {
      console.log("getting", response.data)
      this.setState({
        blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
        totalCount: response.data.meta.total_records,
        isLoading: false
      })
    }).catch(error => {
      console.log("getBlogItems error", error)
    })
  }

  // React v17 and above calls this unsafe
  componentWillMount() {
    this.getBlogItems()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false)
  }

  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />
    })

    return (
      <div className="blog-container">
        <BlogModal
          modalIsOpen={this.state.blogModalIsOpen}
          handleModalClose={this.handleModalClose}
        />

        <div className="new-blog-link">
          <a onClick={this.handleNewBlogClick}>
            Open Modal!
          </a>
        </div>

        <div className="content-container">
          {blogRecords}
        </div>

        {this.state.isLoading ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="yin-yang" spin/>
          </div>
        ) : (
          null
        )}
      </div>
    )
  }
}