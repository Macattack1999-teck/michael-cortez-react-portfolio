import React, { Component } from 'react';
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super()
    this.state = {
      pageTitle: "Welcome to my portfolio",
      data: [
        { title: "Quip", catagory: "eCommerce" },
        { title: "Evenetbrite", catagory: "Scheduling" },
        { title: "Ministry Safe", catagory: "Enterprise" },
        { title: "SwingAway", catagory: "eCommerce" }
      ]
    };

    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.catagory === filter;
      })
    })
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem title={item.title} url={"google.com"} />
    })
  }

  render() {
    return (
      <div>
        <h2>
          {this.state.pageTitle}
        </h2>

        <button onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
        <button onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
        <button onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>

        {this.portfolioItems()}
      </div>
    );
  }
}